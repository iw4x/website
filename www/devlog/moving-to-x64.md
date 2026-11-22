If you have tried to load one of the larger ported maps, such as
mp_cement or mp_boardwalk, you may at some point have seen the game give
up half way through with a message like this one (the number of bytes
varies):

```
Need N more bytes of ram for alloc to succeed
```

What the game is telling us is that it has run out of room in one of its
memory pools. We can make the pool bigger, of course, and we have, more
than once. But on a 32-bit process every byte we give the pool is a byte
of address space that nothing else in the process can use, for as long as
the process runs, and there are only so many of those to hand out.

As of now, IW4x also runs on the 64-bit build of Modern Warfare 2, where
address space is no longer something we have to ration. Getting there
was quite a bit more involved than recompiling the client for a
different target. The client is, in essence, a large collection of
patches against one specific executable, and very little about those
patches survives a move to a different one. In this post we would like
to go through what it took, and in particular through the parts that
turned out to be less obvious than they first seemed, using the
disassembly we worked from.

We weren't the first to try, though. lil suislide did the initial work
that showed a move to the 64-bit build was possible at all, and shared
the proof of concept with us. It lives on to this day in zw3, a zombies
fork of IW4x, and it is what got us to move IW4x itself. The port we
describe here was nevertheless redone from scratch, which is why IW4x
goes about things differently from zw3.

Nothing changes in how you get or play IW4x. iw4x-launcher installs the
64-bit client the same way it has always installed the 32-bit one, and
x64 and x86 players can play on each other's servers (which, as we will
see, took a bit of doing in its own right).

## Why the address space runs out

Let's start with how the game manages its memory, since this is where
the two builds differ most plainly. Instead of allocating memory as it
goes, the game reserves a few large regions when it starts and then
hands out pieces of them as it loads. The biggest of these is the
physical memory pool (PMem), which is where the zones of a map end up.

The reservation is done with `MEM_RESERVE`, which only claims a range of
addresses without committing any memory to it. The pages are committed
later, one zone at a time, as the map loads. In other words, a large pool
costs almost no memory until it is actually used. So where is the
problem?

The problem is the address space itself. A 32-bit process has at most 4
GiB of it (and usually less in practice), and everything in the process
has to fit in there, from the executable and the graphics driver to the
heaps and the game's pools. The stock game reserves 300 MiB for PMem,
which is not enough for mp_cement or mp_boardwalk, nor for several other
ported maps, which all fail with the message above. Nor, as it turned
out, was 450 MiB, our first try. It took 640 MiB to get all of them to
load.

Raise PMem far enough and the next pool in line, the hunk, runs out
instead. This time the failure is on allocations of only a few hundred
bytes, which shows how close to the edge the hunk already was:

```
Hunk_AllocAlign failed on 380 bytes (total 11 MB...)
```

The stock hunk is 10 MiB (IW4x had already raised it to 11 MiB for some
of its heavier menus), and the large maps took it to 64 MiB. Both builds
of IW4x now reserve these amounts, and so these maps load on x86 as well.
But on x86 every such increase is a trade-off, and not a particularly
comfortable one. Over 700 MiB of the address space now goes to the two
pools from the start, and it is taken from the rest of the process, which
may then fail in some other, less predictable way (and probably on
someone else's machine rather than ours). The next map that needs more
will only make it worse. On x64 the trade-off disappears, since there is
so much address space that a few hundred megabytes more cost us,
practically speaking, nothing.

## Finding our way around

Before going into the individual problems, it is worth saying a few words
about how we worked, since the rest of this post is built on it. The x86
client patches the game in well over a thousand places, and every one
of these places has a different address in the 64-bit executable, if it
exists there at all. There is no map between the two builds, and the
64-bit executable carries no symbols. So for each patch we had to find
the same code again.

What we used for this is two disassemblies side by side, one of the x86
executable, where IW4x has named most of what it touches over the years,
and one of the x64 executable, where nothing is named. The most reliable
way across is usually a string. The game's code refers to the same
literals in both builds, so a function that uses a distinctive string can
be found in the other build by finding who refers to that string there.
For example, here are all the places in the x64 executable that refer to
the name of the configuration file:

```
0x14038abb0 'config_mp.cfg'
  0x1401e7216 sub_1401E71C0
  0x1401f3ecf sub_1401F3E80
  0x1401f3f4c sub_1401F3E80
  0x1401f51a7 sub_1401F4F80
  0x1402766a7 sub_1402764D0
```

IW4x keeps its configuration in `iw4x_config.cfg` rather than the game's
file, so every one of these is a place we may have to patch, and the
list is short enough to go through by hand. Reading each of the four
functions then tells us which is which. `sub_1401E71C0` is the handler of
the `exec` command and `sub_1401F3E80` writes the configuration (it is
called every frame, and writes only when something changed).
`sub_1401F4F80` is `Com_Init()`, which runs `exec default_mp.cfg` followed
by the configuration, and `sub_1402764D0` is the file system restart,
which runs the configuration again. Not every function is this
cooperative, of course. Some have no strings at all, and for those we
work our way out from a neighbor that does, through its calls and the
globals it shares with them.

## Out of reach

The first thing that broke, before any of the game-specific problems, was
the hooking itself. On x86 a call or a jump encodes its target as a 32-bit
displacement from the next instruction, and since the whole address space
is 32 bits, a displacement can reach anywhere. On x64 the encoding is the
same, but the address space is not: a 32-bit displacement reaches 2 GiB
either way and no further. The game's executable sits at 0x140000000,
and our DLL is loaded wherever the loader sees fit, which is normally a
lot further away than that.

To see what this means in practice, here is how the game registers the
`unbind` command, whose handler we replace with our own:

```asm
1400EE780: lea     r8, unk_1406C7F78
1400EE785: lea     rdx, sub_1400EFBB0      ; the handler
1400EE78C: lea     rcx, aUnbind            ; "unbind"
1400EE793: call    sub_1401E6F00           ; Cmd_AddCommand
```

The handler's address is loaded with a `lea`, relative to the next
instruction, that is, as the 32-bit distance from `1400EE78C` to the
handler. To register our handler instead, all we have to change is that
distance, and on x86 that would be the end of it. On x64 our function is
too far away for the distance to express. We could rewrite the
instruction into one that takes a full 64-bit address, except that there
isn't one of the same length, and there is no room to make the code any
longer.

What we do instead is find some free memory within reach of the
instruction, which in practice means near the game's image, and put a
small relay there: an absolute jump through a 64-bit address to our
function. The instruction then refers to the relay, which it can reach,
and the relay goes the rest of the way:

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 230" width="100%" role="img" aria-labelledby="relay-title">
<title id="relay-title">A lea in the game reaching our handler through a relay near the game's image</title>
<defs><marker id="relay-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>
<g fill="none" stroke="currentColor" stroke-width="1.5">
<rect x="10" y="30" width="250" height="110"/>
<rect x="30" y="70" width="210" height="28"/>
<rect x="10" y="160" width="250" height="44"/>
<rect x="420" y="30" width="210" height="110"/>
<path d="M240 84 C 300 84, 300 182, 262 182" marker-end="url(#relay-arrow)"/>
<path d="M260 182 C 360 182, 360 100, 418 90" marker-end="url(#relay-arrow)"/>
</g>
<g font-family="ui-sans-serif, sans-serif" font-size="12" fill="currentColor">
<text x="18" y="22">the game (0x140000000)</text>
<text x="428" y="22">our DLL (wherever it lands)</text>
<text x="296" y="128">rel32</text>
<text x="352" y="164">64-bit address</text>
<text x="18" y="222">relay, allocated within 2 GiB of the game</text>
</g>
<g font-family="ui-monospace, monospace" font-size="12" fill="currentColor">
<text x="38" y="89">lea rdx, relay</text>
<text x="20" y="187">jmp qword ptr [rip]; dq handler</text>
<text x="440" y="90">Key_Unbind_f</text>
</g>
</svg>
</figure>

Any instruction that we redirect goes through such a relay when its
target is out of reach, and our hooking code makes one on demand. The
same idea covers data, too. The game reaches its globals through 32-bit
displacements as well, so when we need to give one of them more room
(for example, the table of commands that keys can be bound to, which is
a static array of 78 pointers with no room to grow), the new copy has to
be allocated near the game's image, where the displacements can still
reach it. Our own DLL won't do, since the loader may well have put it
out of reach.

There is one more catch, in detours. A detour replaces the first few
instructions of a function with a jump to our code and copies them, as
they are, to a trampoline, from which they still run when we call the
original. On x64, however, some instructions refer to memory relative to
where they are. Take the start of the handler of the `exec` command, for
example:

```asm
1401E71C0: sub     rsp, 68h
1401E71C4: movsxd  rax, cs:dword_141BBA490
1401E71CB: lea     rcx, dword_141BBA490
```

The first instruction is 4 bytes and our jump needs at least 5, so the
detour has to take the second instruction as well. But that one reads a
global relative to its own address. Move it to the trampoline, and it
reads whatever happens to be at the same distance from the trampoline
instead. Nothing fails at the time, and the result is indistinguishable
from a structure that is a few bytes off (more on those below). This is
why each detour states how many bytes it takes, which has to end on an
instruction boundary, and why a function that starts like this one is
not a good place for a detour.

## Inlined away

The second difference between the two builds is in what the compiler did
with the game's functions. The 64-bit executable was built with a
different compiler (or at least with different settings, as far as we
can tell), and it inlines a good deal more. Which is a problem for us,
since a lot of the x86 patches replace a function or make it return
right away, and once a function is inlined, there is no function left to
patch. Instead, there is a copy of its body in each of its callers.

Take `Steam_CheckConsistency()`, which on a dedicated server checks the
connected players with Steam and kicks those that fail. Steam, it seems,
doesn't always like our servers, so on x86 we make it return right away.
On x64 it is inlined into `Steam_Frame()`, and the only trace of it left
is a test in the middle of that function:

```asm
14024BC07: cmp     cs:dword_1406CCB78, 0
14024BC0E: mov     rbx, [rsp+48h+arg_8]
14024BC13: jnz     loc_14024BD5D
14024BC19: cmp     cs:byte_14651CF00, 0
14024BC20: jz      loc_14024BD5D
```

The `jnz` at `14024BC13` skips the inlined check (which follows it) when
the condition before it holds. To skip it always, we want an
unconditional jump to the same place. As it happens, there is a neat way
to get one without computing anything. This `jnz` is a 6-byte
instruction, `0F 85` followed by a 32-bit displacement, while an
unconditional `jmp` is `E9` followed by a 32-bit displacement, one byte
shorter. If we overwrite the first two bytes with `90 E9`, we get a `nop`
followed by a `jmp` that reuses the original displacement. And since the
`jmp` ends at the same address as the `jnz` did, the displacement still
points to the same place, and so writing two bytes is all it takes to
skip the check for good.

Some functions are inlined more than once. One of the party functions
that a dedicated server skips on x86 is inlined into
`PartyHost_StartParty()` twice: once for the start itself, and once more
in what looks like the handler of the host's keys, which seems to have
been inlined there as well. Each copy has to be found and patched, and
this is where it is easy to go wrong, because missing one doesn't fail.
The patch is in place and works for the copy we found, while the copy we
didn't find carries on as before.

The slow motion needed something different again. x64 keeps it in two
places (one updated by the frame and one by the client, for each of its
commands), and `Com_Frame()` inlines the update of the first. On x86 we
hold the slow motion back for a moment by skipping a call. On x64 there
is no call to skip, so we jump into a stub where the inlined update
starts. The stub saves every volatile register (the game presumably
keeps a few of them live across this point, `xmm` ones included). It
then either skips the update or, if we aren't holding the slow motion
back, redoes the game's own check, which our jump replaced. It is not
pretty, but it is about as close as we can get to skipping a call that
doesn't exist.

## Structures that don't quite match

A large part of what the client does is read and write the game's own
data structures. It does so directly, through C++ definitions of these
structures that mirror the game's, and on x64 quite a few of them turned
out to be wrong. Some of them are wrong in ways that are not at all
obvious.

The obvious part is the pointers. A pointer is 8 bytes on x64 instead of
4, and it has to be aligned to 8 bytes as well, so every field after a
pointer moves (by 4 bytes, or by more if the compiler has to insert
padding to restore the alignment). This much the compiler does for us: we
recompile the definitions for x64, and the fields move exactly as they do
in the game.

Unfortunately, this is not the whole story. Here and there the 64-bit
executable also has a different set of fields, presumably because it was
built from a later revision of the game's source code. A field that was
added in the game is not something that recompiling our definition will
ever tell us about.

What makes this unpleasant is that a structure we get wrong doesn't crash.
Or, at least, it doesn't crash right away. A field that is 16 bytes off
just reads whatever happens to be 16 bytes away, which is usually some
other perfectly valid number, and the client goes on doing the wrong
thing without a word of complaint.

So the approach we settled on is to not trust any of our definitions until
we have found code in the game that confirms them, and to then pin what we
found down with `static_assert`, so that it cannot silently change again.
How do we find such code? The size of a structure usually comes from the
`memset()` that clears it or from the stride of an array that holds it.
The offset of a field comes from code that uses that field in a way only
that field would be used (for example, a counter that the game increments
in the same function that fills the next element of an array).

To give you an idea of what this looks like in practice, let's go through
one of the structures that turned out to be wrong, the renderer's scene,
`GfxScene`. This is a large structure (over 630 KiB) that holds
everything the renderer is going to draw in a frame. The client reads it
for its debug drawing, for example, to draw the collision bounds of the
models in view.

```cpp
struct GfxScene
{
  ...
  float dynamicSpotLightNearPlaneOffset;
  float dynamicSpotLightLength;
  GfxVisibleLight visLight[4];
  GfxVisibleLight visLightShadow[1];
  unsigned int* entOverflowedDrawBuf;
  volatile int gfxEntCount;
  GfxEntity gfxEnts[128];
  int sceneDObjCount;
  ...
  volatile int sceneModelCount;
  ...
};
```

We came across this one while going through our definitions the way
described above. When we looked for the code that uses `sceneDObjCount`,
the number of animated entities in the scene, we found nothing at our
offset. This is odd, since the game has to update this count every time
it adds an entity. There were, however, references 0x10 bytes past it.
The same held for the number of models a little further down, and for
every field after them that we checked: always 0x10 bytes past where we
had it.

A difference this consistent means that something before these fields is
too small. So the next question is, where exactly does the drift start?
The fields before them are where we could still find the game using the
offsets we had. Here is a piece of the code that walks the scene's
visible lights. It comes from a rather large function in the renderer's
frontend that we haven't fully identified, but for our purposes it
doesn't much matter what the function is for, as long as we can see how
it reaches the lights (`r13` holds the address of the scene, which the
function loads a little earlier with `lea r13, unk_148C26480`):

```asm
14002390E: lea     rcx, [r13+616A8h]
140023915: mov     eax, r15d
140023918: lea     rsi, [rax+rax*8]
14002391C: imul    rax, rbx, 2008h
140023923: add     rcx, rax
...
14002392E: mov     r13d, [rax+r13+616A0h]
```

There is quite a bit of information in these few instructions. The
visible lights start at `0x616A0` in the scene, exactly where we have
them, so the drift has to start after that. The `imul` tells us that the
game steps through the lights `0x2008` bytes at a time, which is the
size of one of them. And the two operands, `+616A0h` and `+616A8h`, tell
us that the game reads a 4-byte value at the start of each light and the
rest of it from 8 bytes in.

Now compare this to the definition we had, which is the one from x86:

```cpp
struct GfxVisibleLight
{
  char pad[0x2004];
};
```

Do you see it? On x86 a visible light is 0x2004 bytes, and on x64 it is 4
bytes larger. Presumably that is a pointer following the first 4-byte
value: the pointer has to start at an 8-byte boundary, and so the compiler
inserts 4 bytes of padding before it. We can't be sure without knowing
what is in there (our definition is, after all, just padding), but it is
what the two operands above suggest.

The scene has five of these lights, four in `visLight` followed by one
in `visLightShadow`, so they add up to five times 4 bytes, or 0x14.
Except that the drift is 0x10. Where did the other 4 bytes go? The
answer is in the field right after the lights, which is a pointer and
so has to start at an 8-byte boundary as well. In our layout the lights
ended at 0x6B6B4, and the compiler padded 4 bytes to put the pointer at
0x6B6B8. In the game's they end at 0x6B6C8, which is already a multiple
of 8, and no padding is needed. The padding we had takes up 4 of the
0x14 bytes, and what is left is exactly the 0x10 that every field after
the lights was off by. Here is what that looks like laid out:

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 200" width="100%" role="img" aria-labelledby="scene-title">
<title id="scene-title">The visible lights in our old layout of GfxScene and in the game's</title>
<g font-family="ui-monospace, monospace" font-size="12" fill="currentColor">
<text x="0" y="41">ours</text>
<text x="0" y="111">game</text>
<text x="70" y="16">0x616A0</text>
<text x="440" y="16">0x6B6B8</text>
<text x="460" y="138">0x6B6C8</text>
</g>
<g fill="none" stroke="currentColor" stroke-width="1.5">
<rect x="70" y="24" width="72" height="26"/>
<rect x="142" y="24" width="72" height="26"/>
<rect x="214" y="24" width="72" height="26"/>
<rect x="286" y="24" width="72" height="26"/>
<rect x="358" y="24" width="72" height="26"/>
<rect x="430" y="24" width="10" height="26" stroke-dasharray="2 2"/>
<rect x="440" y="24" width="120" height="26"/>
<rect x="70" y="94" width="78" height="26"/>
<rect x="148" y="94" width="78" height="26"/>
<rect x="226" y="94" width="78" height="26"/>
<rect x="304" y="94" width="78" height="26"/>
<rect x="382" y="94" width="78" height="26"/>
<rect x="460" y="94" width="120" height="26"/>
<path d="M440 50 v44 M460 50 v44" stroke-dasharray="3 3"/>
</g>
<g font-family="ui-monospace, monospace" font-size="11" fill="currentColor" text-anchor="middle">
<text x="106" y="41">0x2004</text>
<text x="178" y="41">0x2004</text>
<text x="250" y="41">0x2004</text>
<text x="322" y="41">0x2004</text>
<text x="394" y="41">0x2004</text>
<text x="426" y="66" text-anchor="end">pad</text>
<text x="500" y="41">the rest</text>
<text x="109" y="111">0x2008</text>
<text x="187" y="111">0x2008</text>
<text x="265" y="111">0x2008</text>
<text x="343" y="111">0x2008</text>
<text x="421" y="111">0x2008</text>
<text x="520" y="111">the rest</text>
<text x="490" y="78">+0x10</text>
</g>
<g font-family="ui-sans-serif, sans-serif" font-size="12" fill="currentColor">
<text x="70" y="170">Five lights, each 4 bytes larger on x64, add 0x14 bytes. The 4 bytes of padding</text>
<text x="70" y="186">our layout had before the next pointer take up 4 of them, which leaves 0x10.</text>
</g>
</svg>
</figure>

With `GfxVisibleLight` at 0x2008 bytes, every reference we had found lines
up. The entity count lands at 0x6BAD4 and the model count at 0x7ED6C.
And at the very end of the structure, the flag that the game checks with
`cmp cs:dword_148CC4480, r12d` lands at 0x9E000, which is exactly where
our `updateSound` now is. We then pinned all of this down:

```cpp
static_assert (offsetof (GfxScene, visLight)        == 0x616A0);
static_assert (offsetof (GfxScene, sceneDObjCount)  == 0x6BAD4);
static_assert (offsetof (GfxScene, sceneModelCount) == 0x7ED6C);
static_assert (offsetof (GfxScene, updateSound)     == 0x9E000);
```

You may be wondering how this went unnoticed for as long as it did. The
answer is that nothing crashed. The debug drawing read the scene's
entities and models 16 bytes off, which, for structures that are mostly
floating point coordinates, gives numbers that look entirely plausible,
and boxes that get drawn somewhere. This is exactly the kind of bug that
the `static_assert` approach is meant to catch, and it is also the reason
we no longer accept a definition just because the client appears to work
with it.

A smaller case of the same kind was in the client game's state, `cg_s`,
where 8 bytes of padding were in the wrong place and put
`localClientNum` 8 bytes early. The rumble code compares that field with
the client number of the predicted player to tell whether it is looking
at the local player, so for a while it was comparing with something else
entirely.

Not every mismatch is about size, though. Sometimes fields move around,
and when two of them have the same type, nothing about the layout tells
us which is which. The script system's `scrVarPub_t` is a good example.
Among other things, it holds the object that a script is working on (as
the id of its script variable) and the name of a field in that object,
`entId` and `entFieldName`. On x86 they are two ints at 0x4C and 0x50.
On x64 two fields before them are gone (`error_message` and
`error_index`), and there are two ints at 0x44 and 0x48 instead. But
which is which?

Here is where x86 uses them. The first function loads both and jumps to
the second, which looks the field up:

```asm
42E051: mov     edx, dword_201A458      ; scrVarPub+50h
42E057: mov     eax, dword_201A454      ; scrVarPub+4Ch
42E05C: jmp     sub_61D850
...
61D850: sub     esp, 8
61D853: shl     eax, 4
61D856: push    ebx
61D857: add     eax, offset word_1DFA390
...
61D860: mov     ebx, edx
...
61D875: add     ebx, 0FF800000h
61D87B: and     ebx, offset unk_FFFFFF
61D881: mov     eax, ebx
61D883: imul    eax, 65h
```

The value from 0x4C is multiplied by 16 (that's the `shl eax, 4`) and
added to the start of an array, so it is an index into the script
variables, each 16 bytes on x86. The value from 0x50 is masked and then
multiplied by 101 (the `imul`), which is how the game hashes a field's
name together with its parent when it looks for a variable. So on x86
`entId` is at 0x4C and `entFieldName` at 0x50, as we had them. Now here
is the same code on x64:

```asm
1402211AC: mov     eax, cs:dword_141F277C4    ; scrVarPub+44h
1402211B2: mov     r9d, cs:dword_141F277C8    ; scrVarPub+48h
1402211B9: inc     eax
1402211BB: add     r9d, 0FF800000h
1402211C2: and     r9d, 0FFFFFFh
1402211C9: imul    r8d, r9d, 65h
1402211CD: lea     rax, [rax+rax*2]
1402211D1: lea     rbp, ds:0[rax*8]
1402211D9: mov     ebx, rva dword_141F4B810[rsi+rbp]
```

The two lookups' instructions are interleaved now, since x64 inlines the
lookup into the function that loads the fields (as it does with so much
else), but the pattern is the same. The value from 0x48 is hashed the
same way, down to the `imul` by 101, and so it is `entFieldName`. The
value from 0x44 is multiplied by 24 (the two `lea`s) and used as an
index, and so it is `entId`, with the script variables now 24 bytes
each. Why x64 adds one to it first, we can only guess. Perhaps its array
of variables starts an entry later.

Not all of the game's state is in structures we can write definitions
for, either. Some of it lives in thread-local storage on x64, such as
the flag that says the configuration has changed and needs writing. Here
is `Key_SetBinding()` storing a binding and then setting that flag:

```asm
1400EF98A: mov     [rax+rcx], r8d          ; the binding
1400EF98E: mov     eax, cs:TlsIndex
1400EF994: mov     ecx, 30h
1400EF999: lea     rbx, ds:0[rax*8]
1400EF9A1: mov     rax, gs:58h
1400EF9AA: mov     rax, [rax+rbx]
1400EF9AE: cmp     byte ptr [rcx+rax], 0
1400EF9B2: jnz     short loc_1400EF9B9
1400EF9B4: call    __dyn_tls_on_demand_init
1400EF9B9: mov     rax, gs:58h
1400EF9C2: mov     ecx, 20h
1400EF9C7: mov     rax, [rax+rbx]
1400EF9CB: mov     rbx, [rsp+28h+var_8]
1400EF9D0: or      dword ptr [rax+rcx], 1
```

On x64 `gs` points to the thread's environment block, and `gs:58h` holds
the thread's array of thread-local storage blocks, one per module. The
game finds its own block through `TlsIndex`, makes sure the block has been
set up (the byte at `0x30` says whether it has, and
`__dyn_tls_on_demand_init` sets it up if not), and then sets bit 0 of the
value at `0x20`. So whatever in the client wants to read or set this flag
has to go the same way, and from the right thread, since another thread
has a block of its own.

## What x64 left out

Then there is what simply isn't there. The 64-bit executable is a leaner
build of the game, and some of the code that IW4x builds on was compiled
out of it entirely: presumably the later revision of the game had no use
for it, and so to the compiler it was dead code. Our rule for the port was
that whatever x86 does, x64 should do too, so each of these had to be put
back on our side.

The largest of them is the menu parser. On x86 we load the raw `.menu`
files in our iwds (and in mods) through the game's own parser, the
`PC_*()` and `Menu_Parse()` family. x64 has none of it, and as far as we
can tell it only ever loads menus from zones. To us this means that every
raw menu we ship would be ignored and the game would fall back to its
stock menus, the main menu included.

How do we get them back, then? One option would be to bring the parser
back by porting x86's, function by function. But the parser comes with
its own precompiler and expression compiler, which is a good chunk of
code that we would then have to keep in step with what the game
expects. Another is to convert our menus into a zone when we build them.
But then a mod's menus on disk would stop working, which x86 supports
and which people rely on.

What we went with instead is [OpenAssetTools](https://github.com/Laupetin/OpenAssetTools),
which already has a menu compiler for IW4 that produces the game's own
menu structures, the same ones a zone would hold. We have it compile the
file as the game's file system finds it (including every file that it
`#include`s), and then we hand the resulting menus to the rest of the
client, which deals with them exactly as it does on x86.

There is a catch, though. OpenAssetTools needs C++23 while the client is
C++20. So the code that talks to it is compiled together with
OpenAssetTools, and the header that it shares with the client keeps to
what C++20 has and doesn't include anything from OpenAssetTools. This also
means that neither side can see both definitions of a menu structure, and
so neither can check by itself that they agree. If they ever don't, the
game would read OpenAssetTools' menus a few bytes off, which presumably
makes for some very creative crashes. So we check them in two halves: the
OpenAssetTools side checks its types against a set of sizes and offsets
in the shared header, and the client checks the game's types against the
same numbers.

Raw weapon files went the same way, since the game's parser for those
(its info string parser) was compiled out along with the menus. Here
OpenAssetTools produces the weapon as a zone would hold it, so a few
fields still need what the zone loader would normally do for them. The
script strings, for example, are indices into OpenAssetTools' own list,
and we turn each one into the game's own string before the weapon gets
anywhere near the game.

The two parsers also differ in what they make of a key that a file
doesn't have. OpenAssetTools only converts the keys that are there and
leaves the strings of the others null, while the game's parser gives a
missing key the empty string. And the game relies on that. It sets up a
weapon's animations by reading the first character of every name, so a
weapon file without, say, a sprint animation crashed the game as soon
as the weapon was set up. So before the weapon is handed over, we give
every string the file didn't set the empty string, which is also what
the weapons in the game's own zones have.

The rest of what we put back is smaller, with the exception of the
in-game console, which we will come back to below. Each of these comes
from reading x86's version and repeating it on x64, and repeating it
exactly turned out to matter more than we expected. Here is an example.

IW4x lets you bind keys to commands of its own, beyond the 78 in the
game's table, which is why the client has its own `bind` (written to
behave the way x86's does). After a while, someone noticed that their key
bindings were reset every time the game was restarted, even though the
configuration file held the right ones. Here is the piece of the game's
own `bind` that we had missed:

```asm
1400EF46A: call    sub_1400EFA80           ; Key_StringToKeynum
1400EF46F: cmp     eax, 0FFFFFFFFh
1400EF472: jz      short loc_1400EF4C1
1400EF474: mov     ecx, eax
1400EF476: mov     [rsp+28h+arg_0], rdi
1400EF47B: call    tolower
```

The game binds the lower case of a letter key, which is what the key
events come with. The configuration file, on the other hand, names the
keys in upper case, as in `bind E "+leanright"`. Without the `tolower`,
every letter bind from the configuration went into the slot for `E`
rather than `e`, which no key press ever reaches. The bindings were all
there, in a sense, just not anywhere the game would look. (The game's
`unbind`, as it happens, doesn't do this, in either build, and so neither
does ours.)

The bindings had one more surprise for us, this time on the way up. When
a key is pressed, the game runs whatever it is bound to through
`CL_ExecBinding()`, which we can simply detour and hand our own bindings
to. When a key is released, however, `CL_KeyEvent()` looks at the
binding itself before it calls anything:

```asm
1400EEA01: mov     rdx, cs:qword_1406CCB70
1400EEA08: test    esi, esi
1400EEA0A: jnz     short loc_1400EEA62
1400EEA0C: lea     rcx, [rbx+rbx*2]
1400EEA10: mov     eax, [r14+rcx*4+8]      ; the binding
1400EEA15: cmp     eax, 41h
1400EEA18: jge     short loc_1400EEA32
1400EEA1A: test    al, 1
1400EEA1C: jz      short loc_1400EEA32
1400EEA1E: lea     edx, [rax+1]
1400EEA21: mov     r8d, ebx
1400EEA24: mov     ecx, edi
1400EEA26: call    sub_1400F5EC0           ; CL_ExecBinding
1400EEA2B: mov     rdx, cs:qword_1406CCB70
1400EEA32: test    dl, 10h
```

The game's buttons are the bindings below 0x41, in pairs where the odd
one presses the button and the one after it releases it. So on release,
the game only does something for an odd binding below 0x41, and what it
runs is the binding plus one (the `lea edx, [rax+1]`). Our bindings all
come after the game's, and so the `jge` skips every one of them. A key
bound to one of our commands would be pressed and never released.

So we replace the `cmp` and the `jge` (exactly the 5 bytes our jump
needs) with a jump to a small stub. At this point the game has the
binding in `eax` and the key in `ebx`. The local client, which our
function needs as well, is in `edi`:

```asm
Bindings_KeyUpStub PROC
  cmp     eax, 41h
  jge     ours

  mov     r11, 1400EEA1Ah
  jmp     r11

ours:
  sub     rsp, 20h
  mov     r8d, ebx
  mov     edx, eax
  mov     ecx, edi
  call    Bindings_KeyUp
  add     rsp, 20h

  mov     rax, 1406CCB70h
  mov     rdx, qword ptr [rax]

  mov     r11, 1400EEA32h
  jmp     r11
Bindings_KeyUpStub ENDP
```

For the game's own bindings the stub repeats the `cmp` and goes back to
the `test al, 1`. For ours it calls our function and goes on at the
`test dl, 10h`, past the game's call. (The jumps back go through `r11`
for the same reason as the relays earlier, since the game is out of
reach of a 32-bit displacement from our DLL.)

What about the last two instructions before the jump? Look at the game's
listing again. It loads `rdx` from a global at `1400EEA01` and tests
`dl` at the very end. In between, right after its own call, it loads
`rdx` again at `1400EEA2B`. The reason is that `rdx` is one of the
registers a call is free to change on x64, so the game reloads it after
calling `CL_ExecBinding()`. Our call is free to change it just the
same, and so the stub has to reload it as well. Otherwise the
`test dl, 10h` (which, judging by the bit, checks the key catchers)
would test whatever our function happened to leave in `dl`.

## Rebuilding the console

If you play IW4x, chances are that you open the console with the tilde
key every now and then without giving it a second thought. On the
64-bit game as it ships, that key does nothing, since there is no
console for it to open. After the menus, the in-game console is the
largest piece that x64 left out.

On x86 the console is part of the game like anything else. Whatever
gets printed is broken into lines, and each finished line goes into a
message window, the same kind that the game shows its own messages in,
only 1024 lines long. Every frame the game draws that window along with
the input line, and as long as the console is open, the console gets
every key.

So how much of this did x64 keep? The keys are a good place to start,
since that is where the console meets the rest of the game. When a key
goes down, x86's `CL_KeyEvent()` checks whether the console is open. As
in the key-up code earlier, `dl` holds the key catchers, and bit 1 is
the console's. If it is set, the key goes to the console:

```asm
4F67A6: test    dl, 1                   ; console open?
4F67A9: jnz     loc_4F685A
...
4F685A: push    esi
4F685B: push    ebp
4F685C: call    sub_4311E0              ; Console_Key
```

x64 has the same check:

```asm
1400EEA62: test    dl, 1                   ; console open?
1400EEA65: jnz     loc_1400EEADD           ; the end of the function
1400EEA67: test    dl, 10h
```

The bit is still there, and a key that comes while it is set is still
kept from the rest of the game. But where x86 hands the key over, x64
jumps to the end of the function. There is nothing left to hand it to.
The rest of the console fared much the same. The printing that feeds it
survived, along with the editing of the input line (presumably because
the chat uses the same code). The window that the lines go into did
not, and neither did anything that draws it. The same goes for the tab
completion.

We could have pointed players at the external console window, which
x64 still has. But nobody opens that in the middle of a match. So we
rebuilt the in-game console instead, on top of what x64 kept. It is a
port of x86's, function by function and under the same names, so that
it behaves the way players are used to. It then has to be connected
wherever x86's console is called from, and the check above is one of
those places. We replace it with a jump to a stub that does what x86
does: if the bit is set, the key goes to our `Console_Key()`, and if
not, the game goes on at the `test dl, 10h`.

Getting the lines in took a little more work. On x86 each finished line
goes through `Con_UpdateNotifyLine()`, which hands it to every message
window that shows its channel, the console's among them. x64 still has
this function, minus the windows it no longer has, so we detour it and
hand the line to ours as well. But, as you may have guessed from the
section on inlining, this is not the only copy of it. `CL_ConsolePrint()`
has one of its own, for the last line of a print:

```asm
1400EBC71: xor     ebx, ebx
1400EBC73: lea     r15, qword_1406C46C8    ; the message windows
1400EBC7A: nop     word ptr [rax+rax+00h]
1400EBC80: mov     r8d, r14d
1400EBC83: mov     edx, r13d
1400EBC86: mov     ecx, ebx
1400EBC88: call    sub_1400F0310           ; Con_IsChannelVisible
1400EBC8D: test    al, al
1400EBC8F: jz      short loc_1400EBCB6
...
1400EBCB1: call    sub_1400EE230           ; Con_UpdateMessageWindowLine
1400EBCB6: inc     ebx
1400EBCB8: cmp     ebx, 3
1400EBCBB: jbe     short loc_1400EBC80
1400EBCBD: mov     r15, [rsp+88h+var_50]
```

This is the same loop as in `Con_UpdateNotifyLine()`, down to the `lea`
of the same table of windows. For each of the game's windows it checks
whether the window shows the line's channel and, if so, adds the line
to it. A line that ends a print goes through this copy, and so our
detour never sees it. What we do here is replace the `xor` at
`1400EBC71` with a jump to a stub. The stub calls
`Con_UpdateNotifyLine()` (which now means our detour) with the
arguments from the registers that the copy keeps them in. Then it goes
on at `1400EBCBD`, past the end of the loop.

With the keys and the lines taken care of, the console works again, but
there is one thing it used to show that took some more digging. Type
`vid_xpos` into the console on x86, and a box opens under the input line
with the values the dvar takes and, above them, a line that says what it
is: "Game window horizontal position". Our port draws that box the way
x86 does, and x86 reads that line straight out of the dvar. So the
question is where x64 keeps it.

On x86 the answer is easy to find. Here is `Dvar_RegisterNew()`, the
function that every `Dvar_Register*()` variant ends up in, filling in a
new dvar:

```asm
648312: mov     ecx, [esp+0Ch+arg_8]    ; flags
...
648319: mov     edx, [esp+0Ch+arg_24]   ; description
...
64832D: mov     [esi+8], ecx
648330: mov     [esi+4], edx
```

The description goes in at 4, right after the name, and the flags at 8.
Here is the same function on x64, from where it takes the next free
dvar out of the pool:

```asm
140284845: movsxd  rcx, edx
140284848: lea     r15, cs:140000000h
14028484F: inc     edx
140284851: mov     cs:byte_1466E38E0, 0
140284858: lea     rbx, rva unk_1466818E0[r15]   ; the pool
14028485F: mov     cs:dword_1466798D8, edx       ; the count
140284865: lea     rax, [rcx+rcx*2]
140284869: shl     rax, 5
14028486D: add     rbx, rax
...
140284892: mov     [rbx], rax                    ; name
...
1402849A7: mov     [rbx+8], r14d                 ; flags
```

The name is a pointer, and so 8 bytes now, and the flags follow it
directly at 8. There is no room left for a description, and it doesn't
turn up anywhere further into the dvar either. The function does still
take one, as its sixth argument, but never so much as reads it. Which
makes us wonder whether the callers still bother to pass it. They do,
and here is the very dvar we started with:

```asm
14002DEDD: lea     rax, aGameWindowHori  ; "Game window horizontal position"
14002DEE2: mov     r9d, 1000h
14002DEE8: mov     [rsp+0F8h+var_D0], rax
14002DEED: lea     edx, [rbp+3]
14002DEF0: mov     r8d, 0FFFFF000h
14002DEF6: mov     dword ptr [rsp+0F8h+var_D8], 1
14002DEFE: lea     rcx, aVidXpos         ; "vid_xpos"
14002DF05: call    sub_1402846A0         ; Dvar_RegisterInt
```

The string goes to `Dvar_RegisterInt()`, from there to
`Dvar_RegisterNew()`, and there it is dropped. Presumably whoever took
the field out of the dvar left the functions' parameters as they were.

For us this is good news, since every description still passes through
one function, and all that is missing is a place to put it. We can't
make the dvar any bigger, since the game allocates the dvars and reads
them itself, but we don't have to. Look at how `Dvar_RegisterNew()` gets
hold of a dvar in the first place. It takes the number of dvars so far
(which it has just checked against 0x1000, the size of the pool),
multiplies it by 0x60 (the `lea rax, [rcx+rcx*2]` triples it, and the
`shl` by 5 does the rest), and adds that to the start of the pool. So
the dvars sit in one array in the order they were registered, and a
dvar's index is its distance from the start of the pool divided by
0x60. We keep the descriptions in an array of our own of the same
length, and a detour of `Dvar_RegisterNew()` stores each description at
the index of the dvar it came with.

There is a wrinkle, though, since a dvar doesn't always start out with
the code that owns it. If your configuration sets a dvar that hasn't
been registered yet, the game creates it on the spot, with nothing to
go on but the name and the value, and with "External Dvar" for a
description. When the code that owns it registers it later, the game
doesn't create another dvar, but registers the existing one again with
`Dvar_Reregister()`. On x86 the description from that second
registration replaces the placeholder, and so we detour
`Dvar_Reregister()` as well and do the same.

There is also the question of when the detours go in. The game only
hands over a description when it registers a dvar, and so a dvar
registered before our detours are in place stays without one (unless it
happens to be registered again). This is why the component that
installs them is among the first we load, before any of our own dvars
exist. With the table filled in, our console draws the description
above the values, in the same box, the way x86 does.

## Two C runtimes

This one is short, but it took a while to see. With `logfile 2`, which
writes the console log and flushes it as it goes, the 64-bit client
ended almost as soon as it started, with the status `0xC0000409`, which
is what the C runtime uses when it gives up on an invalid parameter.

The parameter in question was the log file. The game links its own C
runtime statically, and our DLL comes with another, which means there are
two separate C runtimes in the process, each with its own idea of which
`FILE` objects exist. Our `FS_Flush()` passed the game's log file, opened
by the game's runtime, to our runtime's `fflush()`, which had never heard
of it. The fix is to call the game's own `fflush()` for the game's files.
Needless to say, the same applies to anything else that crosses the
boundary between the two, so we now keep an eye out for it.

## A stale pointer in the zone loader

Not every crash on x64 was ours to begin with. Some were in the game
itself, and the most interesting of these is in the code that loads
zones. A zone is loaded by a set of functions, one per kind of asset,
that walk the asset's data as it is read in. Rather than pass each other
the asset being loaded, these functions keep a pointer to it in a
global, one per kind (we know them by names such as `varXModelSurfs`).
A model's surfaces (`XModelSurfs`) are normally loaded as part of a
model, and here is the end of their loader:

```asm
140123919: mov     rax, cs:qword_140DB5170   ; varXModelSurfs
140123920: cmp     qword ptr [rax+8], 0
140123925: jz      short loc_140123955
140123927: mov     ecx, 3
14012392C: call    sub_140131FB0
140123931: mov     rcx, cs:qword_140DB5170
140123938: mov     [rcx+8], rax
14012393C: mov     cl, 1
14012393E: mov     cs:qword_140DB5C88, rax
140123945: mov     rax, cs:qword_140DB5180   ; varXModelLodInfo
14012394C: movzx   edx, word ptr [rax+4]
140123950: call    sub_140123B90
```

The loader takes the number of surfaces from the model's level of
detail (`varXModelLodInfo`) rather than from the surfaces themselves.
The only function that ever sets that pointer is the model's loader, and
as long as the surfaces come as part of a model, that's fine. But a zone
can also hold surfaces as an asset of their own, and then nothing sets
`varXModelLodInfo`. It still points to the level of detail of whatever
model was loaded last. If that model's zone has since been unloaded and
its memory decommitted, the read at `14012394C` faults. If it hasn't,
the game reads another model's surface count, which is hardly better.

The surfaces carry their own count, so our fix is to read it from there.
We change the `mov` at `140123945` to load `varXModelSurfs` instead, and
the displacement of the `movzx` from 4 to 0x10, which is where the count
is in `XModelSurfs` on x64 (after two pointers, 8 bytes each). The count
is then right whether the surfaces came with a model or not.

## Streaming plain MP3s

The sound turned out to be one of the more involved parts of the
port, since it is where the two builds differ the most underneath. The
game plays its sounds two ways. Most of them are loaded from zones, but
the longer ones, such as music, are streamed from files as they play.
On x86 every sound goes through Miles, the audio middleware the game
licensed, which plays over DirectSound and comes with its own decoders.
Hand it an ordinary MP3 and it will play it. And ordinary MP3s are what
IW4x's own streamed sounds are, as are the ones that an x86 server may
have a client download from it.

x64, on the other hand, plays its sounds through XAudio2 and decodes the
MP3s itself, which is perfectly reasonable for a game that only ever
streams its own files. Before it decodes a stream, it reads the stream's
header to find out how long it is and how to play it, and this is where
our MP3s came to grief. Streaming some of them took the game down with
an integer division by zero. Here is how it reads the header:

```asm
1402BA9CD: cmp     eax, 3334449h          ; "ID3\x03"
1402BA9D2: jnz     loc_1402BAA91
...
1402BAA91: cmp     eax, 46464952h         ; "RIFF"
1402BAA96: jz      loc_1402BABC1
...
1402BAAA3: movsx   r9d, byte ptr [rdx+18h]
...
1402BAAD6: sub     r9d, ecx               ; 16 bits at +20h
...
1402BAAE6: sub     r9d, ecx               ; 16 bits at +1Eh
```

There are three kinds of file the game expects. A `RIFF` file is a WAV,
and it goes its own way. A file that starts with an ID3v2.3 tag is an
MP3 whose tag carries the number of samples. Anything else is taken to
be an MP3 with a header of the game's own, which has the number of
samples at 0x18, less two 16-bit amounts at 0x1E and 0x20 (they look a
lot like the encoder's delay and padding, which a gapless player has to
skip). Then, with the sample rate from the first MP3 frame in `rcx`, it
does this:

```asm
1402BAB7C: movsxd  rax, r9d               ; samples
1402BAB7F: imul    rax, 3E8h              ; * 1000
1402BAB86: cqo
1402BAB88: idiv    rcx                    ; / rate
1402BAB8B: mov     r8, rax                ; length in ms
1402BAB8E: lea     eax, [r9+r9]
1402BAB92: cdqe
1402BAB94: cqo
1402BAB96: idiv    r8
```

That is, it works out the length in milliseconds and then divides by
it. And this is where it goes wrong. A plain MP3 has neither of the
game's headers. It may well start with an ID3v2.3 tag, as many MP3s
do, but not one that has the count where the game looks for it. So
whatever the game reads there is part of some other tag or simply audio
data, and the "number of samples" that comes out of it is just as
arbitrary. Whenever it amounts to less than a millisecond, the length
comes out as zero, and the second `idiv` takes the game down. Why the
game never checks for that, we can only guess, but presumably it never
had to, since its own files always have one of the two headers.

So what does it take to read such a file ourselves? An MP3 is a sequence
of frames, each with a 4-byte header of its own that starts with 11 set
bits (the frame sync). The rest of the header gives the frame's sample
rate and bitrate among other things, and from those we can work out the
frame's length. Finding the first frame is a little less obvious than it
sounds, though. The file may start with an ID3 tag, which we skip, but
even past that, 11 set bits can just as well turn up in the middle of
other data. So we only take a frame if the frame that should follow it,
at its offset plus its length, is there and agrees with it on the sample
rate and the MPEG version.

The number of samples is the other half. Many encoders write it into
the first frame, LAME in a Xing (or Info) header and Fraunhofer's
encoder in a VBRI header, and when either is there we take the count
from it. When neither is, we estimate the count from the length of the
file at the first frame's bitrate, which is exact for a constant bitrate
and, we hope, close enough for a variable one.

With that, we fill in the header the way the game does for one of its
own MP3s, down to how it works out the average bytes, so that the rest
of the game can't tell the difference. We go in where the stream thread
opens a stream and calls the game's parser, and only take over when the
game would divide by zero. A file in which we can't find a frame we can
read gets an error like the one x86 prints when it can't play a streamed
sound, which x64 doesn't have.

The move away from Miles also took care of a few workarounds that x86
IW4x needs. The x86 game starts Miles before it creates its window,
which leaves DirectSound bound to the wrong window or to none, and Miles
itself releases the DirectSound interface twice. XAudio2 isn't bound to
a window at all, and the game no longer goes through Miles, so none of
that has anything to fix on x64.

## Playing with x86

You would think that an x64 client and an x86 server should just work
together. Both are IW4, and as far as the network goes they look the
same, down to the delta encoding of the messages. But the 64-bit
executable seems to have been built from a later revision of the game,
and somewhere between the two a handful of things got renumbered.

The first things a client runs into are the server message ops, the byte
in front of each part of a server message. x86 has an `svc_nop` that x64
dropped, and x64 moved `svc_snapshot` from the end of the list to the
front, so not a single op has the same number in both. Then there are the
server commands, the text commands that a server queues for a client
reliably. They are named by their first letter, and x64 renamed most of
them (one of them, the scores, also carries an extra number per player on
x64). Why anyone would renumber the protocol of a shipped game is anyone's
guess.

What makes this unpleasant for us is that none of these changes the shape
of a message. A client that gets one wrong doesn't fail to parse anything,
it parses happily and does the wrong thing, or it reads a field a few bits
off and everything after that turns into garbage.

So what do we do about it? We could teach each side to speak both
dialects and somehow negotiate, but then every server and client out
there would have to know about it. Instead, the 64-bit client always
speaks x86 on the wire, whichever side it is on, and translates wherever
the game reads or writes, so that the game itself only ever sees its own
numbering. x86 seemed the natural choice for the wire, since that's what
everything out there already speaks, demos included. The translation
itself turned out to be the easy part. The part that took the most head
scratching is the scrambling.

Both sides scramble their messages, and they do it with the reliable
commands. The client keys what it sends with the last server command it
got and then xors the text of that same command over the rest of the
message. The server unscrambles it with its own copy of that command. It
isn't security in any real sense (perhaps it was meant to keep casual
packet editors at bay), but it does mean that both sides have to agree on
the text of these commands byte for byte. And since we translate the
commands, we have to put the wire form back for the moment the game
scrambles or unscrambles. That works, at least most of the time. The
time it didn't was on an x64 server, where an x86 player who picked a
team was dropped a moment later with "Lost reliable commands". Here is
the server's unscrambling loop, `SV_Netchan_Decode()`, with `rcx`
pointing to the client and `r11` to the command it keys with:

```asm
14023D30A: mov     eax, [rcx+20E74h]       ; reliableAcknowledge
...
14023D31B: and     eax, 7Fh
...
14023D331: imul    r11, rax, 408h
...
14023D33B: add     r11, rcx
...
14023D350: cmp     [rax+r11+0A70h], dil    ; end of the command?
14023D358: lea     r9, [r9+1]
14023D35C: mov     ecx, r8d
14023D35F: cmovz   rax, rdi                ; then start over
14023D363: and     ecx, 1
14023D366: inc     r8d
14023D369: movzx   edx, byte ptr [rax+r11+0A70h]
14023D372: inc     rax
14023D375: shl     dl, cl
14023D377: xor     r10b, dl
14023D37A: xor     [r9-1], r10b
14023D37E: cmp     r8d, ebx
14023D381: jl      short loc_14023D350
```

The command comes from a ring of 128 (that's the `and eax, 7Fh`) that
starts at `0xA70` in the client, with `0x408` bytes to a command. The one
it picks is the client's `reliableAcknowledge`. Then, for each byte of
the message, the loop takes the next character of the command and folds
it into the key. Notice what it does at the end of the command: when
the character at the current position is zero, the `cmovz` resets the
position to the start, and the loop goes on from there, reading the
first character and then moving on to the next. In other words, the
loop treats the command as a string and cycles through it.

Now, picking a team (as it turned out) makes the scripts on an x64
server send `T`, a command for which we had no x86 letter at the time,
and so its wire form was empty. What we did was put the wire form, that
is, a zero, in place of the first letter, leaving the rest of the
command's text where it was. The x86 client, of course, only
ever got an empty command and keys with zeros. The server, however,
starts over when it hits the zero. It reads that zero once more and then
moves on into the text we left behind it:

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 200" width="100%" role="img" aria-labelledby="scramble-title">
<title id="scramble-title">The characters the server and the client key with when the command's slot still holds the game's text</title>
<g font-family="ui-sans-serif, sans-serif" font-size="12" fill="currentColor">
<text x="0" y="22">the server's slot</text>
<text x="0" y="92">server keys with</text>
<text x="0" y="152">client keys with</text>
</g>
<g fill="none" stroke="currentColor" stroke-width="1.5">
<rect x="170" y="8" width="36" height="26"/><rect x="206" y="8" width="36" height="26"/><rect x="242" y="8" width="36" height="26"/><rect x="278" y="8" width="36" height="26"/><rect x="314" y="8" width="36" height="26"/><rect x="350" y="8" width="36" height="26"/>
<rect x="170" y="78" width="36" height="26"/><rect x="206" y="78" width="36" height="26"/><rect x="242" y="78" width="36" height="26"/><rect x="278" y="78" width="36" height="26"/><rect x="314" y="78" width="36" height="26"/><rect x="350" y="78" width="36" height="26"/>
<rect x="170" y="138" width="36" height="26"/><rect x="206" y="138" width="36" height="26"/><rect x="242" y="138" width="36" height="26"/><rect x="278" y="138" width="36" height="26"/><rect x="314" y="138" width="36" height="26"/><rect x="350" y="138" width="36" height="26"/>
<path d="M206 70 v102" stroke-width="2" stroke-dasharray="4 3"/>
</g>
<g font-family="ui-monospace, monospace" font-size="12" fill="currentColor" text-anchor="middle">
<text x="188" y="26">\0</text><text x="224" y="26">t₁</text><text x="260" y="26">t₂</text><text x="296" y="26">t₃</text><text x="332" y="26">\0</text><text x="368" y="26">\0</text>
<text x="188" y="96">\0</text><text x="224" y="96">t₁</text><text x="260" y="96">t₂</text><text x="296" y="96">t₃</text><text x="332" y="96">\0</text><text x="368" y="96">t₁</text>
<text x="188" y="156">\0</text><text x="224" y="156">\0</text><text x="260" y="156">\0</text><text x="296" y="156">\0</text><text x="332" y="156">\0</text><text x="368" y="156">\0</text>
</g>
<g font-family="ui-sans-serif, sans-serif" font-size="12" fill="currentColor">
<text x="400" y="26">the rest of T's text, its letter zeroed</text>
<text x="400" y="90">starts over at each zero,</text>
<text x="400" y="104">then reads on past it</text>
<text x="400" y="156">only ever got zeros</text>
<text x="170" y="192">From the second character on, the two keys differ.</text>
</g>
</svg>
</figure>

From that point on the two sides disagree on the key, and so the server
reads noise where the rest of the client's message should be. Somewhere
in that noise it finds what looks like a gap in the client's commands,
which it duly reports as "Lost reliable commands". The fix is to copy
the wire form only up to its first zero and clear the rest, which makes
the server's copy as empty as the client's. (We have since also given `T`
a translation. It carries a position from the `predictStreamPos` script
method, which neither build's client does anything with, presumably a
leftover of the consoles' streaming. Still, an x86 server sends it as
`X`, and so now do we.)

## Pure servers

Another surprise came when hosting. In a private match on the 64-bit
build, the host's own client would be dropped with "Impure client
detected". A pure server only lets in clients whose iwds match its own,
and IW4x servers normally aren't pure, so we went looking for why this
one was. Here is the server checking a client:

```asm
140236740: mov     rax, cs:off_140423E48
140236747: cmp     byte ptr [rax], 0
14023674A: jz      loc_1402367EC
140236750: cmp     dword ptr [rdi+212F4h], 2
140236757: jnz     loc_1402367EC
```

The first two instructions read the `sv_pure` setting through a pointer,
and if it is set, a client whose pure state is 2 is dropped. On x86 that
pointer leads to the dvar. On x64 it leads to a constant 1 in the
executable's read-only data. The later revision, it seems, made every
server pure and folded the dvar away, so there was nothing to turn off.

But why the host's own client? Reading a file from an iwd, unless it is
something like a `.cfg` or a `.menu`, counts as referencing that iwd,
and the raw weapon files from earlier are read from ours. So the client
references an iwd that isn't on the server's list and gets dropped by its
own server. We register `sv_pure` ourselves (off by default, as on x86)
and point the game at our dvar's value instead of the constant.

## Steam

The last difference we want to go through is Steam's. The game talks to
Steam through a handful of interfaces, such as `SteamFriends` and
`SteamUser`, which it gets from `steam_api` and which IW4x implements
itself where Steam has to be stood in for. Each interface is a C++ class
with virtual functions, and the game calls them the way any C++ code
would, through the class's table of function pointers. Here, for
example, is x86 opening Steam's invite dialog:

```asm
4304B9: call    ds:SteamFriends
4304BF: mov     edx, [eax]
4304C1: mov     ecx, eax
4304C3: mov     eax, [edx+4Ch]
4304C6: push    offset aLobbyinvite     ; "LobbyInvite"
4304CB: call    eax
```

There is no name anywhere in this call. The game loads the table from
the object (`mov edx, [eax]`) and calls whatever is at 0x4C in it,
which with 4-byte pointers is slot 19. In the version of
`SteamFriends` that x86 was built against, slot 19 is
`ActivateGameOverlay()`, and so that is the function our implementation
has to have in slot 19. Now here is the same call on x64:

```asm
14024C71D: call    cs:SteamFriends
14024C723: lea     rdx, aLobbyinvite      ; "LobbyInvite"
14024C72A: mov     rcx, rax
14024C72D: mov     r8, [rax]
14024C730: add     rsp, 28h
14024C734: jmp     qword ptr [r8+0A8h]
```

With 8-byte pointers 0xA8 is slot 21, two slots later than on x86. The
x64 executable was built against a newer version of the interface, one
that has three more functions about clans before `ActivateGameOverlay()`
and has lost one about avatars. So had we kept the x86 layout, this call
would have landed in slot 21 of that layout, which is
`ActivateGameOverlayToWebPage()`, with "LobbyInvite" for a web page.
And another call close by, which x64 makes at 0xC0 (slot 24), would have
gone past the end of the x86 table altogether, since that table only has
24 slots.

So each interface has to be laid out the way the version that x64 was
built against lays it out. The difficulty is that the game never says
which version that is. It gets its interfaces through `steam_api`'s
plain accessors, such as `SteamFriends()`, rather than asking for a
version by name, and so the slots it calls are all we have to go by.
What we did is take, for each interface, the earliest version whose
slots match every call that x64 makes (`SteamFriends013` and
`SteamUser016`, for example), and lay it out the way the Steamworks SDK
1.20 does. Any matching version would do, really, and the earliest seems
the least likely to bring along anything we don't need. Every
interface but `SteamMasterServerUpdater` is now laid out this way.

## What is not there yet

Every component of the x86 client is in the 64-bit one, except BotLib.
BotLib extends the game's precompiler, which x64 doesn't have to begin
with, and the two menu directives it adds, `#elifdef` and `#elifndef`,
are handled in our OpenAssetTools code instead.

Theatre plays the demos that the 64-bit client records. Playing the demos
recorded with x86 IW4x, or with the Steam and retail games, is not there
yet.

Finally, the protocol differences above are the ones we found, and there
may well be more that we haven't run into. If something behaves oddly
only between an x64 and an x86 player, please report it on the
[issue tracker](https://github.com/iw4x/iw4x-client/issues), since that
is probably where the next one is hiding.

The whole port, about 270 commits of it, is in
[pull request #438](https://github.com/iw4x/iw4x-client/pull/438). And
thanks once more to lil suislide, whose proof of concept got all of this
started.

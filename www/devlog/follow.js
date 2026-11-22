// Link the names in a post's prose to the lines of its listings.
//
// When a post walks through some disassembly, the paragraphs after the
// listing name what they are talking about in inline code: an instruction
// (imul), an operand (+616A0h), or an address (14002391C). We turn each
// such name into a control that highlights the lines it occurs on while
// the reader hovers over or focuses it, and brings them into view when
// clicked. A name is looked up in the listings of its own section, the
// latest first, since that is almost always the one the prose is on. But
// the earlier ones stay in play, since the text now and then goes back to
// one of them to compare.
//
// The matching is purely textual, which makes it a bit of a guess. A name
// that the latest listing happens to contain wins even if the prose meant
// another one, and an instruction as common as lea lights up every line
// it is on. If a name lights up the wrong lines, then the fix is in the
// post: spell out more of the instruction (lea rax, [rcx+rcx*2] instead
// of just lea) and it will match the one line.
//
// All we do to the page is add spans and toggle classes, and how these
// look is up to tailwind.css. Which also means that without the script a
// post reads exactly the same, just without the links.
//

// Return the name the way we look for it in a listing.
//
// IDA writes a number the MASM way (616A0h) and the prose usually the C
// way (0x616A0), so we strip both the prefix and the suffix. Note that the
// h goes even when it is part of a word, as in push, but that only makes
// the match a little looser.
//
function norm (s)
{
  return s.trim ()
          .toLowerCase ()
          .replace (/\s+/g, " ")
          .replace (/^0x/, "")
          .replace (/h$/, "");
}

// Wrap each line of the listing in a span of its own, so that we can
// highlight a line by itself, and return the spans along with each line's
// address (null if it has none) and the rest of the line, in lower case
// and with the column padding collapsed.
//
// Note that we keep the highlighting that the build did. Its spans never
// contain a line break (see asm.lang), so they move into their line whole
// and only the text between them gets split.
//
function lines (code)
{
  const nodes = [...code.childNodes];
  const spans = [];

  code.textContent = "";

  const line = () =>
  {
    const s = document.createElement ("span");
    code.append (s);
    return s;
  };

  let span = line ();

  for (const n of nodes)
  {
    if (n.nodeType !== Node.TEXT_NODE || !n.data.includes ("\n"))
    {
      span.append (n);
      continue;
    }

    const parts = n.data.split ("\n");

    parts.forEach ((p, i) =>
    {
      if (p !== "")
        span.append (p);

      if (i !== parts.length - 1)
      {
        span.append ("\n");
        spans.push (span);
        span = line ();
      }
    });
  }

  if (span.textContent === "")
    span.remove ();
  else
    spans.push (span);

  return spans.map (span =>
  {
    const l = span.textContent.replace (/\n$/, "");
    const m = l.match (/^\s*([0-9A-Fa-f]+):\s*(.*)$/);

    return {span,
            addr: m ? m[1].toLowerCase () : null,
            body: (m ? m[2] : l).toLowerCase ().replace (/\s+/g, " ")};
  });
}

// Link the name to the lines it matches, if any.
//
// We compare a name with an address only as a whole. Were we to look for
// it inside the address as well, a short operand such as 0x2008 would
// match every address with those digits in it.
//
function link (name, listings)
{
  const n = norm (name.textContent);

  // A single letter (the E of a key binding, say) is too little to go on.
  //
  if (n.length < 2)
    return;

  let hit = [];

  for (let i = listings.length - 1; i >= 0 && hit.length === 0; --i)
    hit = listings[i].filter (l => l.addr === n || l.body.includes (n));

  if (hit.length === 0)
    return;

  const on  = () => { name.classList.add ("follow-on");
                      hit.forEach (l => l.span.classList.add ("follow-on")); };
  const off = () => { name.classList.remove ("follow-on");
                      hit.forEach (l => l.span.classList.remove ("follow-on")); };

  // Scrolling moves the page out from under the pointer and so ends the
  // hover at once. That's why the lines get a class of their own here,
  // which we take away two seconds later, about as long as it seems to
  // take to spot them. A reader who asked for reduced motion gets the
  // jump without the animation.
  //
  const jump = () =>
  {
    const smooth = !matchMedia ("(prefers-reduced-motion: reduce)").matches;

    hit[0].span.scrollIntoView ({block: "center",
                                 behavior: smooth ? "smooth" : "auto"});

    hit.forEach (l => l.span.classList.add ("follow-jump"));
    setTimeout (() =>
                  hit.forEach (l => l.span.classList.remove ("follow-jump")),
                2000);
  };

  // Make the name work like a button, from the keyboard and for assistive
  // technology as well. It is not a link, since it doesn't take the reader
  // anywhere the URL could say.
  //
  name.classList.add ("follow");
  name.tabIndex = 0;
  name.setAttribute ("role", "button");
  name.title = hit.length === 1 ? "Show the line" : "Show the lines";

  name.addEventListener ("mouseenter", on);
  name.addEventListener ("mouseleave", off);
  name.addEventListener ("focus", on);
  name.addEventListener ("blur", off);
  name.addEventListener ("click", jump);
  name.addEventListener ("keydown", e =>
  {
    if (e.key === "Enter" || e.key === " ")
    {
      e.preventDefault ();
      jump ();
    }
  });
}

for (const prose of document.querySelectorAll (".prose"))
{
  let listings = [];

  for (const e of prose.children)
  {
    if (e.matches ("pre"))
    {
      const code = e.querySelector ("code");

      // Assembly is all we can follow. A post normally marks it as asm,
      // but a block that it didn't mark still counts if its first line
      // starts with an address.
      //
      if (code !== null &&
          (code.classList.contains ("language-asm") ||
           /^\s*[0-9A-Fa-f]+:/.test (code.textContent)))
        listings.push (lines (code));
    }
    else if (e.matches ("h2, h3"))
      listings = [];
    else if (listings.length !== 0 && e.matches ("p, li"))
    {
      for (const c of e.querySelectorAll ("code"))
        link (c, listings);
    }
  }
}

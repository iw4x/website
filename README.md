# IW4x website

This repository contains the source of the IW4x website at
[iw4x.io](https://iw4x.io).

Each language is published as a single page. Everything a browser loads
is produced by [`build2`](https://build2.org) from the files kept here.
Note that the published site carries no JavaScript, so a web server that
serves static files is all it requires.

The English page, `www/index.html`, holds all user-visible text.
Translations are [GNU gettext](https://www.gnu.org/software/gettext/) PO
catalogues in `po/`, and translated page are generated from that
same English document.

## Repository layout

```
buildfile                project-wide build definition
manifest                 package metadata
build/                   project-wide build system files
po/                      translations and gettext configuration
  LINGUAS                the languages we publish
  POTFILES               the pages translatable text is extracted from
  its/                   ITS rules describing what in the HTML is translatable
  <lang>.po              one catalogue per language named in LINGUAS
tests/                   the test suite
upstream/tailwind/       the Tailwind CSS CLI release selection and checksums
www/                     the website sources
  index.html             the English page, and the source of every other page
  404.html               the error page, which is not translated
  tailwind.css           the authored stylesheet
  htaccess.in            the Apache configuration template
  favicon.ico
  inter/                 the self-hosted Inter webfont
```

Note that the build writes nothing into the source tree. Anything that
appears under `www/` in the output directory is generated, and so is
`po/iw4x.pot`. A checkout together with an empty output directory
reproduces the published site.

## How the site is built

The build acquires the Tailwind CSS CLI first.
`upstream/tailwind/tailwind.build` selects the release artifact for the
host and records its SHA256. `curl` downloads that artifact into a
temporary file. Bail out if its checksum disagrees with the recorded
one. Supply your own copy through `config.iw4x_website.tailwind` when
the machine has no network access.

The CLI then generates `www/site.css` from `www/tailwind.css`. Tailwind
scans `www/index.html` and `www/404.html` to decide which utility
classes to emit, so both pages are prerequisites of the stylesheet.
Editing a page regenerates the CSS.

`en/index.html` is a copy of `www/index.html` with the configured origin
substituted for the production one.

Each translated page comes from `msgfmt --xml --replace-text`, which
takes the English document as a template and puts the strings of one PO
catalogue in place of its translatable text. Note that a page depends on
exactly one catalogue. Editing `fr.po` rebuilds the French page and
leaves the other languages alone.

`sitemap.xml`, `robots.txt` and `.htaccess` are generated from
`po/LINGUAS` together with the configured origin. This is why a new
language needs little beyond its catalogue. The sitemap entries and the
server's language-prefix rules follow from that one list.

## Prerequisites

| Requirement                                                          | Notes                                                               |
|----------------------------------------------------------------------|---------------------------------------------------------------------|
| [build2 toolchain](https://build2.org/install.xhtml) 0.18.0 or later | provides `b`, `bpkg` and `bdep`                                     |
| GNU gettext 0.23 or later                                            | `xgettext`, `msgfmt`, `msgmerge`; `msginit` to start a new language |
| `curl`                                                               | to acquire the Tailwind CSS CLI                                     |
| network access to `github.com`                                       | likewise, unless you supply the CLI yourself                        |
| `xmllint` (libxml2), optional                                        | enables the well-formedness checks in the test suite                |

Note that gettext version matters. `msgfmt --replace-text` arrived in 0.23,
and the same release changed how escaping is handled between `xgettext`
and `msgfmt`. An older gettext will not build this site correctly.

Note also that our build recipe acquires the Tailwind CSS CLI by
itself. Nothing else needs installing.

## Building

### Setting up a build configuration

`build2` builds out of source, so the first step creates a build
configuration. `bdep` associates the configuration with the project and
forwards it, which lets you run `b` from the source directory
afterwards:

```
$ git clone https://github.com/iw4x/website.git
$ cd website
$ bdep init -C ../website-build @build --
```

The trailing `--` is required. `bdep init -C` expects the list of build
system modules to configure, and this project needs none, so the list is
empty.

You can also configure the build system directly. Nothing then ties the
source directory to the output directory, so each command names the
latter:

```
$ b configure: ./@../website-build/
$ b ../website-build/
```

The rest of this document assumes the `bdep` setup. With a directly
configured build system, read `b <operation>` as
`b <operation> ../website-build/` throughout and spell explicit target names
the same way. For example,

```
$ b 'po/pot{iw4x}'
```

becomes

```
$ b './po/@../website-build/po/pot{iw4x}'
```

### Building the site

```
$ b
```

The result lands in `../website-build/iw4x-website/www/` and is an
essentially literal image of what gets published:

```
www/
  site.css
  404.html
  favicon.ico
  robots.txt
  sitemap.xml
  .htaccess
  en/index.html
  fr/index.html         one directory per language in po/LINGUAS
  inter/
```

### Previewing the site

There is no development server. The output directory is a static tree,
so any file server will do:

```
$ cd ../website-build/iw4x-website/www
$ python3 -m http.server 8080
```

Then open <http://localhost:8080/en/>.

Note that this serves the files without the generated `.htaccess`, so
the redirects described there are not in effect. Browse to `/en/` and
`/fr/` directly.

### Testing

```
$ b test:
```

The test suite lives in `tests/testscript`. Part of it reads the sources
directly. Most of it configures, builds and installs the project into a
temporary directory and then inspects the result, which makes it slower
than a build. Run it before opening a pull request.

The suite holds the source tree and the published site to their
invariants. Every language named in `LINGUAS` has a catalogue that
passes `msgfmt --check`. The `hreflang` alternates in `www/index.html`
agree with `LINGUAS`. No published page carries scripting. Every
internal link resolves to a file that was installed. A distribution of
the project rebuilds to the same site as a checkout.

Point the build at `xmllint` to also check that the generated pages and
the sitemap are well formed:

```
$ b test: config.iw4x_website.xmllint=/usr/bin/xmllint
```

### Installing

Installation stages the site for deployment. It writes the files that
belong on the web server and nothing else:

```
$ b install: config.install.root=/tmp/stage
```

The site goes to `<root>/share/iw4x-website/www/`. The package's
`README.md`, `LICENSE.md` and `manifest` go to
`<root>/share/doc/iw4x-website/`.

### Cleaning

```
$ b clean:
```

### Creating a distribution

```
$ b dist: config.dist.root=/tmp/dist
```

This produces a source archive directory holding the authored files. The
test suite uses it to verify that a distribution rebuilds to the same
site as a checkout.

### Configuration variables

Pass these to `bdep init`/`b configure:`, or to any later `b` command to
change them for that build.

| Variable                                | Default           | Purpose                                                                                                                                              |
|-----------------------------------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `config.iw4x_website.url`               | `https://iw4x.io` | The origin every generated URL is written with. Set it when building for staging.                                                                    |
| `config.iw4x_website.tailwind`          | *(none)*          | Path to a Tailwind CSS CLI to use in place of a download.                                                                                            |
| `config.iw4x_website.tailwind.checksum` | *(none)*          | The expected SHA256 of that CLI. Required with the above, and when overriding the version.                                                           |
| `config.iw4x_website.tailwind.version`  | `4.3.3`           | The Tailwind release to acquire. Changing it requires a checksum, since the ones in `upstream/tailwind/tailwind.build` belong to the pinned version. |
| `config.iw4x_website.tailwind.url`      | GitHub releases   | The base URL the release artifact is downloaded from.                                                                                                |
| `config.iw4x_website.xmllint`           | *(none)*          | Path to `xmllint`. Enables the well-formedness tests.                                                                                                |
| `config.iw4x_website.curl`              | `curl`            |                                                                                                                                                      |
| `config.iw4x_website.chmod`             | `chmod`           |                                                                                                                                                      |
| `config.iw4x_website.xgettext`          | `xgettext`        |                                                                                                                                                      |
| `config.iw4x_website.msgfmt`            | `msgfmt`          |                                                                                                                                                      |
| `config.iw4x_website.msgmerge`          | `msgmerge`        |                                                                                                                                                      |

For example, to build against a Tailwind CLI you already have:

```
$ b config.iw4x_website.tailwind=/usr/local/bin/tailwindcss \
    config.iw4x_website.tailwind.checksum=dc61b3ac6b8c9ca874c0cc4c57b2409791a64c5540404ca5f5367360babc313a
```

## Translating

Translations are ordinary PO catalogues. The
[gettext manual](https://www.gnu.org/software/gettext/manual/html_node/PO-Files.html)
documents the file format.

Translating the site requires no HTML and no build. Build the site when
you want to see your translation in place, which is worth doing once
before you submit it.

### What is translatable

`po/its/iw4x.its` holds the rules. The translatable text is the element
text in the body of `www/index.html` together with the page title.

Text that a reader sees lives in element text. Note that `msgfmt`
replaces element text and leaves attribute values alone, so an
accessible name written as an `aria-label` would stay English on every
translated page. The page uses a visually hidden `<span>` where such a
name is needed. One attribute stays English as a consequence, the page
description in `<meta name="description">`.

An element marked `translate="no"` carries a name and stays as it is.
The IW4x wordmark and `x86` are marked this way. Inline SVG is excluded
as well, since the icons carry no text.

`www/404.html` is served outside the language directories and is not
translated.

An untranslated or fuzzy entry falls back to the English text, so a
partial translation is publishable. A language whose catalogue is half
done shows English for the rest.

### Adding a new language

Say we want to add French. Build the message template first. It is
generated from the English page and is not kept in version control:

```
$ b 'po/pot{iw4x}'
```

Create the catalogue from it:

```
$ msginit --no-translator                               \
          --no-wrap                                     \
          --input=../website-build/iw4x-website/po/iw4x.pot \
          --locale=fr                                   \
          --output-file=po/fr.po
```

Open `po/fr.po` and correct its header before translating anything:

```
"Last-Translator: Your Name <you@example.com>\n"
"Content-Type: text/plain; charset=UTF-8\n"
```

`msginit` writes `charset=ASCII`. `msgfmt` then rejects the catalogue as
soon as it holds an accented character, so change the charset to `UTF-8`
now.

Name the language in `po/LINGUAS`, one code per line:

```
fr
```

A language code is a plain lowercase ISO 639-1 code such as `fr`, `de`
or `pl`. Region subtags such as `pt-BR` are not supported by the page
generation or by the server rules. Open an issue if you need one.

Add the matching `hreflang` alternate to the `<head>` of
`www/index.html`. This is the one HTML edit a new language needs:

```html
<link rel="alternate" hreflang="en" href="https://iw4x.io/en" />
<link rel="alternate" hreflang="fr" href="https://iw4x.io/fr" />
<link rel="alternate" hreflang="x-default" href="https://iw4x.io/en" />
```

Keep the alternates in the order of `LINGUAS`, with `en` first and
`x-default` last. Note that the test suite compares the two sequences in
order, so a mismatch fails immediately. Leave the hardcoded
`https://iw4x.io` origin in place. The build substitutes it.

Build and look at the result:

```
$ b
$ b test:
```

The French page appears at `../website-build/iw4x-website/www/fr/index.html`.

### Translating a catalogue

Edit the `msgstr` of each entry. Any PO editor works, as does a plain
text editor.

```
#: www/index.html:80 www/index.html:126
msgid "Documentation"
msgstr "Documentation"
```

A `#:` comment naming several locations means the same English string
appears more than once in the page and is translated once for all of
them. Open `www/index.html` at one of those lines when the surrounding
context is unclear.

Markup that appears inside a message stays intact together with its
attributes. The `msgid` is the authority for what that markup is, and
only the text around it changes.

Names are left alone. `IW4x` and `x86` are marked untranslatable and do
not reach the catalogue. The page title is the one message that spells
the name, and its `msgstr` stays empty unless your language spells
`IW4x` differently.

Remove the `#, fuzzy` marker from an entry once you have checked its
translation. Note that a fuzzy entry is ignored and the page falls back
to English.

Check your work before committing:

```
$ msgfmt --check --output-file=- po/fr.po
$ b test:
```

### Keeping catalogues up to date

The catalogues have to follow the English page when it changes. An
explicit target carries out that merge, since an ordinary build never
rewrites a file a translator authored:

```
$ b 'po/alias{update-po}'
```

This regenerates the template from the English page and merges it into
every catalogue named in `LINGUAS`. A catalogue may gain untranslated
entries. An entry whose English text was edited is marked `#, fuzzy` and
keeps its previous `msgid` alongside as `#|`, which shows the
translator what changed. Both kinds fall back to English until someone
gets to them.

Run this as part of the same change when you edit the English text in
`www/index.html`, so that the catalogues do not drift.

## Submitting a change

Work happens on [github.com/iw4x/website](https://github.com/iw4x/website)
through pull requests.

Fork the repository and branch off `main`, naming the branch after what
it does, such as `fr-translation`. Make your change and run `b test:`. A
pull request is expected to arrive with a passing test suite. Say so in
the description when a failure looks unrelated to your change. Write a
short imperative commit summary under about 70 characters and use the
body to explain why the change is being made when that is not obvious.
`Add French translation` is a good summary for a new language. Push the
branch and open a pull request describing the change.

A translation pull request carries the catalogue, its `LINGUAS` entry
and the `hreflang` alternate. Note that `po/iw4x.pot` and everything
else the build generates stays out of version control by design, so
leave those files out of the commit.

The build runs `xgettext` and `msgmerge` with `--no-wrap` so that
message text stays on one line and a diff stays readable. Turn off any
reflowing your PO editor performs. Leave the whitespace of
`www/index.html` untouched where your change does not reach it.

Editing the English text means updating the catalogues in the same
commit, as described above. Translators see the affected entries as
fuzzy and follow up.

Open an issue first when you are unsure whether a change is wanted. This
holds for a change to the design of the page or to the set of languages
we publish.

## Licence

The website is distributed under the terms of the GNU General Public
License, version 3 or later. See [`LICENSE.md`](LICENSE.md).

The Inter typeface in `www/inter/` is distributed under the SIL Open
Font License 1.1. See [`www/inter/LICENSE`](www/inter/LICENSE).

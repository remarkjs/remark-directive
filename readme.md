# remark-directive

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**remark**][remark] plugin to support the [generic directives proposal][prop]
(`:cite[smith04]`, `::youtube[Video of a cat in a box]{v=01ab2cd3efg}`, and
such).

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`unified().use(remarkDirective)`](#unifieduseremarkdirective)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This is a plugin that works with [unified][] (specifically, [remark][], for
markdown).
That means it’s easier to use than lower-level tools such as micromark or mdast,
which are abstracted away.

It adds support for a syntax that allows arbitrary extensions in markdown.
You use it with some code specific to match your needs, to allow for anything
from callouts, specifically styled blocks, forms, embeds, spoilers, anything!

## When should I use this?

This is one of the four ways to extend markdown: an arbitrary extension syntax.
(See [Extending markdown](https://github.com/micromark/micromark#extending-markdown)
in micromark’s docs for the more details and the alternatives).
This mechanism works well when you control who authors the markdown and it is
rendered in a place and by tooling you control.
Example use cases are building a docs website with some custom needs for your
project or company, or in blogging tools and static site generators.
It generally works well when authors are not expected to know the ins and outs
of HTML or JavaScript, but can be trusted to read a guide on how to embed a
tweet.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

[npm][]:

```sh
npm install remark-directive
```

## Use

Say we have the following file, `example.md`:

```markdown
:::main{#readme}

Lorem:br
ipsum.

::hr{.red}

A :i[lovely] language know as :abbr[HTML]{title="HyperText Markup Language"}.

:::
```

And our module, `example.js`, looks as follows:

```js
import {readSync} from 'to-vfile'
import {reporter} from 'vfile-reporter'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkDirective from 'remark-directive'
import remarkRehype from 'remark-rehype'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import {visit} from 'unist-util-visit'
import {h} from 'hastscript'

const file = readSync('example.md')

unified()
  .use(remarkParse)
  .use(remarkDirective)
  .use(customPlugin)
  .use(remarkRehype)
  .use(rehypeFormat)
  .use(rehypeStringify)
  .process(file)
  .then((file) => {
    console.error(reporter(file))
    console.log(String(file))
  })

// This plugin is just an example! You can handle directives however you please!
function customPlugin() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        const data = node.data || (node.data = {})
        const hast = h(node.name, node.attributes)

        data.hName = hast.tagName
        data.hProperties = hast.properties
      }
    })
  }
}
```

Now, running `node example` yields:

```txt
example.md: no issues found
```

```html
example.md: no issues found
<main id="readme">
  <p>Lorem<br>ipsum.</p>
  <hr class="red">
  <p>A <i>lovely</i> language know as <abbr title="HyperText Markup Language">HTML</abbr>.</p>
</main>
```

## API

This package exports no identifiers.
The default export is `remarkDirective`.

### `unified().use(remarkDirective)`

Configures remark so that it can parse and serialize directives.
Doesn’t handle the directives: [create your own plugin][create-plugin] to do
that.
See the [micromark extension for the syntax][syntax] and the
[mdast utility for the syntax tree][syntax-tree].

## Security

Use of `remark-directive` does not involve [**rehype**][rehype]
([**hast**][hast]) or user content so there are no openings for [cross-site
scripting (XSS)][xss] attacks.

## Related

*   [`remark-gfm`](https://github.com/remarkjs/remark-gfm)
    — GFM
*   [`remark-github`](https://github.com/remarkjs/remark-github)
    — Autolink references like in GitHub issues, PRs, and comments
*   [`remark-frontmatter`](https://github.com/remarkjs/remark-frontmatter)
    — Frontmatter (YAML, TOML, and more)
*   [`remark-math`](https://github.com/remarkjs/remark-math)
    — Math

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/remarkjs/remark-directive/workflows/main/badge.svg

[build]: https://github.com/remarkjs/remark-directive/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-directive.svg

[coverage]: https://codecov.io/github/remarkjs/remark-directive

[downloads-badge]: https://img.shields.io/npm/dm/remark-directive.svg

[downloads]: https://www.npmjs.com/package/remark-directive

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-directive.svg

[size]: https://bundlephobia.com/result?p=remark-directive

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[unified]: https://github.com/unifiedjs/unified

[remark]: https://github.com/remarkjs/remark

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[rehype]: https://github.com/rehypejs/rehype

[hast]: https://github.com/syntax-tree/hast

[prop]: https://talk.commonmark.org/t/generic-directives-plugins-syntax/444

[create-plugin]: https://unifiedjs.com/learn/guide/create-a-plugin/

[syntax]: https://github.com/micromark/micromark-extension-directive#syntax

[syntax-tree]: https://github.com/syntax-tree/mdast-util-directive#syntax-tree

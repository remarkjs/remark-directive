import {directive} from 'micromark-extension-directive'
import {directiveFromMarkdown, directiveToMarkdown} from 'mdast-util-directive'

let warningIssued

export default function remarkDirective() {
  const data = this.data()

  // Old remark.
  /* c8 ignore next 14 */
  if (
    !warningIssued &&
    ((this.Parser &&
      this.Parser.prototype &&
      this.Parser.prototype.blockTokenizers) ||
      (this.Compiler &&
        this.Compiler.prototype &&
        this.Compiler.prototype.visitors))
  ) {
    warningIssued = true
    console.warn(
      '[remark-directive] Warning: please upgrade to remark 13 to use this plugin'
    )
  }

  add('micromarkExtensions', directive())
  add('fromMarkdownExtensions', directiveFromMarkdown)
  add('toMarkdownExtensions', directiveToMarkdown)

  function add(field, value) {
    // Other extensions.
    /* c8 ignore next */
    if (data[field]) data[field].push(value)
    else data[field] = [value]
  }
}

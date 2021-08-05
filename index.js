import syntax from 'micromark-extension-directive'
import fromMarkdown from 'mdast-util-directive/from-markdown.js'
import toMarkdown from 'mdast-util-directive/to-markdown.js'

var warningIssued

export default function remarkDirective() {
  var data = this.data()

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

  add('micromarkExtensions', syntax())
  add('fromMarkdownExtensions', fromMarkdown)
  add('toMarkdownExtensions', toMarkdown)

  function add(field, value) {
    // Other extensions.
    /* c8 ignore next */
    if (data[field]) data[field].push(value)
    else data[field] = [value]
  }
}

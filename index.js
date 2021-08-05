import {directive} from 'micromark-extension-directive'
import {directiveFromMarkdown, directiveToMarkdown} from 'mdast-util-directive'

export default function remarkDirective() {
  const data = this.data()

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

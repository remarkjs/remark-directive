/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast-util-directive')} DoNotTouchAsThisImportIncludesDirectivesInTree
 * @typedef {import('unified').Processor<Root>} Processor
 */

import {directive} from 'micromark-extension-directive'
import {directiveFromMarkdown, directiveToMarkdown} from 'mdast-util-directive'

/**
 * Add support for generic directives.
 *
 * @returns {undefined}
 *   Nothing.
 */
export default function remarkDirective() {
  // @ts-expect-error: TS is wrong about `this`.
  // eslint-disable-next-line unicorn/no-this-assignment
  const self = /** @type {Processor} */ (this)
  const data = self.data()

  /** @type {Array<unknown>} */
  // @ts-expect-error: to do: remove.
  const micromarkExtensions =
    data.micromarkExtensions || (data.micromarkExtensions = [])
  /** @type {Array<unknown>} */
  // @ts-expect-error: to do: remove.
  const fromMarkdownExtensions =
    data.fromMarkdownExtensions || (data.fromMarkdownExtensions = [])
  /** @type {Array<unknown>} */
  // @ts-expect-error: to do: remove.
  const toMarkdownExtensions =
    data.toMarkdownExtensions || (data.toMarkdownExtensions = [])

  micromarkExtensions.push(directive())
  fromMarkdownExtensions.push(directiveFromMarkdown)
  toMarkdownExtensions.push(directiveToMarkdown)
}

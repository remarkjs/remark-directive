import fs from 'fs'
import path from 'path'
import test from 'tape'
import vfile from 'to-vfile'
import unified from 'unified'
import remark from 'remark'
import not from 'not'
import hidden from 'is-hidden'
import directive from '../index.js'

test('directive()', function (t) {
  t.doesNotThrow(function () {
    remark().use(directive).freeze()
  }, 'should not throw if not passed options')

  t.doesNotThrow(function () {
    unified().use(directive).freeze()
  }, 'should not throw if without parser or compiler')

  t.end()
})

test('fixtures', function (t) {
  var base = path.join('test', 'fixtures')
  var entries = fs.readdirSync(base).filter(not(hidden))

  t.plan(entries.length)

  entries.forEach(each)

  function each(fixture) {
    t.test(fixture, function (st) {
      var file = vfile.readSync(path.join(base, fixture, 'input.md'))
      var input = String(file.contents)
      var outputPath = path.join(base, fixture, 'output.md')
      var treePath = path.join(base, fixture, 'tree.json')
      var proc
      var actual
      var output
      var expected

      proc = remark().use(directive).freeze()
      actual = proc.parse(file)

      try {
        expected = JSON.parse(fs.readFileSync(treePath))
      } catch (_) {
        // New fixture.
        fs.writeFileSync(treePath, JSON.stringify(actual, 0, 2) + '\n')
        expected = actual
      }

      try {
        output = fs.readFileSync(outputPath, 'utf8')
      } catch (_) {
        output = input
      }

      st.deepEqual(actual, expected, 'tree')
      st.equal(String(proc.processSync(file)), output, 'process')

      st.end()
    })
  }
})

import unified = require('unified')
import directive = require('remark-directive')

unified().use(directive)
unified().use(directive)

unified().use(directive, {weird: true}) // $ExpectError

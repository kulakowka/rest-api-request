'use strict'


module.exports.previewQuery = (req, res, next) => {
  let queryText = '<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.1.0/styles/github.min.css"><script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.1.0/highlight.min.js"></script><script>hljs.initHighlightingOnLoad();</script>'
  queryText += '<pre><code class="javascript">Model.find()'
  
  queryText += "\n\n// where\n\n"
  if (req.query.where) queryText += '.where(' + JSON.stringify(req.query.where, null, 2) + ')\n'
    
  

  queryText += "\n\n// populate\n\n"
  if (req.query.populate) req.query.populate.map(field => {
    queryText += '.populate(' + JSON.stringify(field, null, 2) + ')\n'
  })

  queryText += "\n\n// select\n\n"
  if (req.query.select) req.query.select.map(field => {
    queryText += '.select(' + JSON.stringify(field, null, 2) + ')\n'
  })

  queryText += "\n\n// sort\n\n"
  if (req.query.sort) queryText += `.sort(${JSON.stringify(req.query.sort, null, 2)})\n`

  queryText += "\n\n// limit\n\n"
  if (req.query.limit) queryText += `.limit(${req.query.limit})\n`
  

  queryText += "\n\n// skip\n\n"
  if (req.query.skip) queryText += `.skip(${req.query.skip})\n`

  queryText += "\n\n</code><pre>"

  return queryText
}
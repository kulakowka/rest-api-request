'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const builder = require('./builder')
const preview = require('./preview')
const getUrl = require('./getUrl')

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res, next) => {
  let demoUrl = builder.getUrl()
  let scripts = '<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.1.0/styles/github.min.css"><script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.1.0/highlight.min.js"></script><script>hljs.initHighlightingOnLoad();</script>'
  res.send(`
    ${scripts}
    <h2>Full example</h2>
    <br>
    <pre><code class="javascript">
Model
  .find({name: 'kulakowka'})
  .where({isAdmin: true})
  .where({gender: 'female'})
  .populate('comments')
  .populate('user', 'name fullname')
  .populate({
    path: 'owner',
    select: 'name',
    match: {
      color: 'black'
    },
    options: {
      sort: {
        name: -1
      }
    }
  })
  .populate('car1   car2    car3')
  .select('name age +notselected')
  .select('name age -password')
  .select({
    name: 1,
    user: 1,
    source: -1
  })
  .sort({ createdAt: -1, name: -1 })
  .limit(10)
  .skip(10)
    </code></pre>
    <p>GET: <a href="${demoUrl}">${decodeURIComponent(demoUrl)}</a></p>
    <br>
    <pre><code class="javascript">Model.find({name: 'testname'}).getUrl()</code></pre>
    <p>GET: <a href="${getUrl.indexUrl}">${decodeURIComponent(getUrl.indexUrl)}</a></p>
    <br>
    <pre><code class="javascript">Model.findOne({name: 'testname'}).getUrl()</code></pre>
    <p>GET: <a href="${getUrl.showUrl}">${decodeURIComponent(getUrl.showUrl)}</a></p>
    <br>
    <pre><code class="javascript">Model.create().getUrl()</code></pre>
    <p>POST: <a hrer="${getUrl.createUrl}">${decodeURIComponent(getUrl.createUrl)}</a></p>
    <br>
    <pre><code class="javascript">Model.update({name: 'testname'}, {name: 'new name'}).getUrl()</code></pre>
    <p>PUT: <a href="${getUrl.updateUrl}">${decodeURIComponent(getUrl.updateUrl)}</a></p>
    <br>
    <pre><code class="javascript">Model.delete({name: 'testname'}).getUrl()</code></pre>
    <p>DELETE: <a href="${getUrl.deleteUrl}">${decodeURIComponent(getUrl.deleteUrl)}</a></p>
  `)
})

app.get('/:model/:action', (req, res, next) => {
  // Mongoose query builder
  let queryText = preview.previewQuery(req)
  
  // res.json(req.query)
  res.send(queryText)
})

app.listen(3333, function () {
  console.log('Example app listening on port 3333!')
})


module.exports = app
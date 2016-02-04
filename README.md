# The project is under development

## Configure

```javascript
const options = {
  baseUrl: 'http://localhost:3001/api'
}

const API = require('rest-api-request')(options)
```
## Get single item

#### GET http://localhost:3001/api/user/admin

```javascript
var query = API.find('user', 'admin').send()

query.then(user => {
  /*
    {
      username: 'admin',
      email: 'admin@example.com'
    }
   */
})

query.catch(error => console.log(error))
```

## Get items list

#### GET http://localhost:3001/api/post?where={"category":123}&select=id,title&populate=comments,creator&limit=10&offset=10

```javascript
var query = API.find('post')
  .where({category: 123})
  .select('id,title,comments,creator') // or .select(['id', 'title', 'comments', 'creator'])
  .populate('comments,creator') // or .populate(['comments', 'creator'])
  .limit(10)
  .offset(10)
  .send()
  
query.then(posts => {
  /* 
    variable posts contains response body:
    [
      {
        id: 1,
        title: 'Test post 1', 
        creator: {
          username: 'kulakowka',
          email: '...'
        },
        comments: [
          {text: 'First comment', id: 312},
          {text: 'Two comment', id: 313}
        ]
      },
      ...
    ]
  */
})
  
query.catch(error => console.log(error))
```


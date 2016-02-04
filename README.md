
## Configure

```javascript
const options = {
  baseUrl: 'http://localhost:3001/api'
}

const apiRequest = require('./lib/request')(options)
```
## Get single item

#### GET http://localhost:3001/api/user/admin

```javascript
apiRequest
  .find('user', 'admin')
  .then(user => {
    /* 
      variable user contains response body:
      {
        username: 'admin', 
        email: '...'
      }
    */
  })
  .catch(error => console.log(error))
```

#### GET http://localhost:3001/api/post/123

```javascript
apiRequest
  .find('post', 123)
  .then(post => {
    /* 
      variable post contains response body:
      {
        id: 123,
        title: 'Test post', 
        text: '...'
      }
    */
  })
  .catch(error => console.log(error))
```

## Get one item

#### GET http://localhost:3001/api/post

```javascript
apiRequest
  .find('post')
  .then(posts => {
    /* 
      variable posts contains response body:
      [
        {
          id: 1,
          title: 'Test post 1', 
          text: '...'
        },
        {
          id: 2,
          title: 'Test post 2', 
          text: '...'
        },
      ]
    */
  })
  .catch(error => console.log(error))
```

#### GET http://localhost:3001/api/post?where={"category":123}&select=id,title&populate=comments,creator&limit=10&offset=10

```javascript
apiRequest
  .where({category: 123})
  .select('id,title,comments,creator') // or .select(['id', 'title', 'comments', 'creator'])
  .populate('comments,creator') // or .populate(['comments', 'creator'])
  .limit(10)
  .offset(10)
  .find('post')
  .then(posts => {
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
  .catch(error => console.log(error))
```


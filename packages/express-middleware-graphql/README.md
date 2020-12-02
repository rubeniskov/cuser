<p align="center">
  <a href="./"><img width="250" src="https://raw.githubusercontent.com/rubeniskov/cuser/master/docs/logo.svg" alt="cuser logo" /></a>
</p>

# @cuser/express-middleware-graphql

## Status
[![codecov](https://codecov.io/gh/rubeniskov/cuser/branch/master/graph/badge.svg?flag=express-middleware-graphql)](https://codecov.io/gh/rubeniskov/cuser)
[![npm](https://img.shields.io/npm/v/@cuser/express-middleware-graphql.svg)](https://www.npmjs.com/package/@cuser/express-middleware-graphql)




```graphql
mutation {
  publishMessage(input: {
    topicId: "RANDOM_TOPIC_CID",
    content: {
      data: "Message content"
    },
    user: {
      peerId: "RANDOM_PEER_ID",
      username: "exampleuser",
      avatar: "https://www.w3schools.com/howto/img_avatar.png"
    }
  }) {
    messageId
  }
}
```

```graphql
mutation {
  updateMessage(input: {
    topicId: "RANDOM_TOPIC_CID",
    messageId: "message_id",
    content: {
      data: "Message content"
    },
    user: {
      peerId: "RANDOM_PEER_ID",
      username: "exampleuser",
      avatar: "https://www.w3schools.com/howto/img_avatar.png"
    }
  }) {
    messageId
  }
}
```

```graphql
mutation {
  deleteMessage(input: {
    topicId: "RANDOM_TOPIC_CID",
    messageId: "message_id",
    user: {
      peerId: "RANDOM_PEER_ID",
      username: "exampleuser",
      avatar: "https://www.w3schools.com/howto/img_avatar.png"
    }
  })
}
```

### References
- https://graphql.org/graphql-js/mutations-and-input-types/

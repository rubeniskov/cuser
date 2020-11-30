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

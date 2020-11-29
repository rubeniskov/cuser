```texplain
curl -X POST \
  http://localhost:8080/v1/message \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
    "topicId": "RANDOM_TOPIC_CID",
    "content": {
        "data": "Message content"
    },
    "user": {
        "peerId": "RANDOM_PEER_ID",
        "username": "exampleuser",
        "avatar": "https://www.w3schools.com/howto/img_avatar.png"
    }
}'
```

```texplain
curl -X PATCH \
  http://localhost:8080/v1/message \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
    "topicId": "RANDOM_TOPIC_CID",
    "messageId": "message_id",
    "content": {
        "data": "Message content"
    },
    "user": {
        "peerId": "RANDOM_PEER_ID",
        "username": "exampleuser",
        "avatar": "https://www.w3schools.com/howto/img_avatar.png"
    }
}'
```

```texplain
curl -X DELETE \
  http://localhost:8080/v1/message \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
    "topicId": "RANDOM_TOPIC_CID",
    "messageId": "message_id",
    "user": {
        "peerId": "RANDOM_PEER_ID",
        "username": "exampleuser",
        "avatar": "https://www.w3schools.com/howto/img_avatar.png"
    }
}'
```

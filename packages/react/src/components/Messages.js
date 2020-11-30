import { useMemo } from 'react';
import Message from './Message';

export const Messages = ({
  messages,
  loading,
  limit
}) => {
  const loadingMessages = useMemo(() => new Array(limit).fill(null).map((_, id) => (<Message key={id} loading={true}/>)), [limit])
  return (
    <div>
      {messages.map((message) => <Message key={message.id} {...message}/>)}
      {loading && loadingMessages}
    </div>
  )
}

export default Messages

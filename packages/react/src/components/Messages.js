// Core
import { useRef, useEffect, useCallback, useMemo, useState, lazy } from 'react';
// Hooks
import useMessages from '../hooks/useMessages';
import useAuth from '../hooks/useAuth';
// Components
import Message from './Message';
import LoadMore from './LoadMore';


const NoMessages = lazy(() => import('./NoMessages'));

export const Messages = ({
  auto,
  limit = 10,
  ...restProps
}) => {
  const wrapperRef = useRef(null);
  const [editMessageId, setEditMessageId] = useState(null);
  const { loading, fetchMore, data = {}, error } = useMessages({
    ...restProps,
    limit,
  });

  const { user } = useAuth();
  const { edges = [], pageInfo: { hasNextPage } = {} } = data;
  const messages = edges.map(({ node }) => node);

  const loadMore = useCallback(() => fetchMore(), [fetchMore, edges.length]);
  const loadingMessages = useMemo(() => new Array(limit).fill(null).map((_, id) => (<Message key={id} loading={true}/>)), [limit]);

  const handleEdit = useCallback((_, messageId) => setEditMessageId(messageId), []);
  const handleAbortEdit = useCallback((_) => setEditMessageId(null), []);
  const handleCompleteEdit = useCallback((_) => setEditMessageId(null), []);

  if (error) {
    return <div>{error.message}</div>
  }

  if (messages.length === 0) {
    return <NoMessages />;
  }


  return (
    <div ref={wrapperRef}>
      {messages.map((message) => <Message
        key={`${message.id}:rev_${message.content.revision}`}
        peerId={user.data && user.data.peerId}
        onEdit={handleEdit}
        onAbort={handleAbortEdit}
        onComplete={handleCompleteEdit}
        editMode={editMessageId === message.id}
        {...message}
      />)}
      {loading && loadingMessages}
      {hasNextPage && <LoadMore auto={auto} loading={loading} contentRef={wrapperRef} onLoadMore={loadMore}/>}
    </div>
  )
}

export default Messages

// Core
import { useRef, useCallback, useMemo } from 'react';
// Hooks
import useMessages from '../hooks/useMessages';
// Components
import Message from './Message';
import LoadMore from './LoadMore';

export const Messages = ({
  topicId,
  limit = 10,
  auto
}) => {
  const wrapperRef = useRef(null);
  const { loading, fetchMore, data = {} } = useMessages({ topicId, limit });
  const { edges = [], pageInfo: { hasNextPage } = {} } = data;
  const messages = edges.map(({ node }) => node);

  const loadMore = useCallback(() => fetchMore(), [fetchMore, edges.length]);
  const loadingMessages = useMemo(() => new Array(limit).fill(null).map((_, id) => (<Message key={id} loading={true}/>)), [limit]);

  return (
    <div ref={wrapperRef}>
      {messages.map((message) => <Message key={message.id} {...message}/>)}
      {loading && loadingMessages}
      {hasNextPage && <LoadMore auto={auto} loading={loading} contentRef={wrapperRef} onLoadMore={loadMore}/>}
    </div>
  )
}

export default Messages

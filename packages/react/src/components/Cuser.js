// Core
import { useRef, useCallback } from 'react';
import styled from 'styled-components';
// Hooks
import useMessages from '../hooks/useMessages';
// Components
import Messages from './Messages';
import MessageWriter from './MessageWriter';
import LoadMore from './LoadMore';

export const Cuser = ({
  className,
  topicId ,
  limit = 10,
  auto,
}) => {
  const wrapperRef = useRef(null);
  const { loading, fetchMore, data } = useMessages({ topicId, limit });
  const { messages = [], count = 0 } = data || {};
  const hasMore = messages.length < count;
  const loadMore = useCallback(() => fetchMore({ offset: messages.length }), [fetchMore, messages.length])

  return (
    <div ref={wrapperRef} className={className}>
      <div><MessageWriter topicId={topicId} /></div>
      <Messages limit={limit} loading={loading} messages={messages} />
      {hasMore && <LoadMore auto={auto} loading={loading} contentRef={wrapperRef} onLoadMore={loadMore}/>}
    </div>
  )
}

export default styled(Cuser)`
  font-family: sans-serif;
  /* overflow: scroll; */
  /* height: 20rem; */
`

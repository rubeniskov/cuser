import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
// Core
import { useRef, useCallback } from 'react';
import styled from 'styled-components'; // Hooks

import useMessages from '../hooks/useMessages'; // Components

import Messages from './Messages';
import MessageWriter from './MessageWriter';
import LoadMore from './LoadMore';
export const Cuser = ({
  className,
  topicId,
  limit = 10,
  auto
}) => {
  const wrapperRef = useRef(null);
  const {
    loading,
    fetchMore,
    data
  } = useMessages({
    topicId,
    limit
  });
  const {
    messages = [],
    count = 0
  } = data || {};
  const hasMore = messages.length < count;
  const loadMore = useCallback(() => fetchMore({
    offset: messages.length
  }), [fetchMore, messages.length]);
  return /*#__PURE__*/_jsxs("div", {
    ref: wrapperRef,
    className: className,
    children: [/*#__PURE__*/_jsx("div", {
      children: /*#__PURE__*/_jsx(MessageWriter, {
        topicId: topicId
      })
    }), /*#__PURE__*/_jsx(Messages, {
      limit: limit,
      loading: loading,
      messages: messages
    }), hasMore && /*#__PURE__*/_jsx(LoadMore, {
      auto: auto,
      loading: loading,
      contentRef: wrapperRef,
      onLoadMore: loadMore
    })]
  });
};
export default styled(Cuser)`
  font-family: sans-serif;
  /* overflow: scroll; */
  /* height: 20rem; */
`;
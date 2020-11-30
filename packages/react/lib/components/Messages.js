import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import Message from './Message';
export const Messages = ({
  messages,
  loading,
  limit
}) => {
  const loadingMessages = useMemo(() => new Array(limit).fill(null).map((_, id) => /*#__PURE__*/_jsx(Message, {
    loading: true
  }, id)), [limit]);
  return /*#__PURE__*/_jsxs("div", {
    children: [messages.map(message => /*#__PURE__*/_jsx(Message, { ...message
    }, message.id)), loading && loadingMessages]
  });
};
export default Messages;
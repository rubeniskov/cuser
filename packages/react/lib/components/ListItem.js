import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import styled from 'styled-components';
export const ListItem = ({
  className,
  side,
  children
}) => {
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx("div", {
      className: "side",
      children: side
    }), /*#__PURE__*/_jsx("div", {
      className: "content",
      children: children
    })]
  });
};
export default styled(ListItem)`
  display: flex;
  flex-flow: row;
  margin-bottom: 0.5rem;
  position: 'relative';
  .side {
    width: 3rem;
    margin-right: 1rem;
  }
  .content {
    flex-grow: 1;
  }
`;
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import styled, { keyframes } from 'styled-components';
import clsx from 'clsx';
import humanElapsed from 'human-elapsed';
import Avatar from './Avatar';
import ListItem from './ListItem';
export const Message = ({
  id,
  loading,
  className,
  content = {},
  user = {},
  mdate
}) => /*#__PURE__*/_jsxs(ListItem, {
  className: clsx(className, {
    loading
  }),
  side: /*#__PURE__*/_jsx(Avatar, {
    loading: loading,
    avatar: user.avatar
  }),
  children: [/*#__PURE__*/_jsx("span", {
    className: "user-username",
    children: user.username
  }), /*#__PURE__*/_jsx("br", {}), /*#__PURE__*/_jsx("small", {
    className: "elapsed-time",
    children: humanElapsed(new Date().getTime() - mdate)
  }), /*#__PURE__*/_jsx("p", {
    className: "content-data",
    children: content.data
  })]
});
const placeHolderShimmer = keyframes`
0%{
  background-position: -468px 0
}
100%{
  background-position: 468px 0
}
`;
export default styled(Message)`
  .user-username {
    display: inline-block;
    font-weight: bold;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
  }
  .elapsed-time {
    display: inline-block;
    opacity: 0.5;
  }
  .content{
    flex-grow: 1;
  }
  .content-data {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    opacity: 0.8;
  }
  &.loading {
    .user-username, .elapsed-time, .content-data {
      background-color: #EFEFEF;
      height: 1rem;
      min-width: 10rem;
      animation-duration: 1.5s;
      animation-delay: .5s;
      animation-fill-mode: forwards;
      animation-iteration-count: infinite;
      animation-name: ${placeHolderShimmer};
      animation-timing-function: linear;
      background: darkgray;
      background: linear-gradient(to right, #eeeeee 10%, #dddddd 18%, #eeeeee 33%);
      background-size: 800px 104px;
    }
    .user-username {
      min-width: 25rem;
    }
    img {
      filter: grayscale(1);
    }
  }
`;
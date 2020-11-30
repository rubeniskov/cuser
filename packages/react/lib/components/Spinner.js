import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import styled, { keyframes } from 'styled-components';

const Spinner = ({
  className
}) => {
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx("div", {
      className: "rect1"
    }), /*#__PURE__*/_jsx("div", {
      className: "rect2"
    }), /*#__PURE__*/_jsx("div", {
      className: "rect3"
    }), /*#__PURE__*/_jsx("div", {
      className: "rect4"
    }), /*#__PURE__*/_jsx("div", {
      className: "rect5"
    })]
  });
};

const strechDelay = keyframes`
0%, 40%, 100% {
  transform: scaleY(0.4);
}  20% {
  transform: scaleY(1.0);
}
`;
export default styled(Spinner)`
  display: inline-block;
  height: 1rem;
  text-align: center;
  font-size: 10px;
  vertical-align: middle;
  line-height: initial;
  & > div {
    background-color: #333;
    height: 100%;
    width: 0.3rem;
    margin: 0 0.1rem;
    display: inline-block;

    animation: ${strechDelay} 1.2s infinite ease-in-out;
  }

  & .rect2 {
    animation-delay: -1.1s;
  }

  & .rect3 {
    animation-delay: -1.0s;
  }

  & .rect4 {
    animation-delay: -0.9s;
  }

  & .rect5 {
    animation-delay: -0.8s;
  }
`;
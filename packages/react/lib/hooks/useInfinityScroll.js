"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var useInfinityScroll = function useInfinityScroll(onLoadMore) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$contentRef = _ref.contentRef,
      contentRef = _ref$contentRef === void 0 ? {} : _ref$contentRef,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled;

  (0, _react.useLayoutEffect)(function () {
    if (!disabled && contentRef.current && typeof onLoadMore === 'function') {
      var scrollTarget = contentRef.current.offsetParent;

      if (scrollTarget) {
        if (scrollTarget === document.body) {
          scrollTarget = window;
        }

        var handleScroll = function handleScroll(evt) {
          var botttomRefPos = contentRef.current.clientTop + contentRef.current.clientHeight;
          var scrollBottomPos = document.documentElement.scrollTop + document.documentElement.clientHeight;

          if (botttomRefPos - scrollBottomPos < 0) {
            onLoadMore(evt);
          }
        };

        scrollTarget.addEventListener('scroll', handleScroll, true);
        return function () {
          scrollTarget.removeEventListener('scroll', handleScroll, true);
        };
      }
    }
  }, [contentRef, onLoadMore, disabled]);
};

var _default = useInfinityScroll;
exports["default"] = _default;
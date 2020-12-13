import { useLayoutEffect } from 'react';

const useInfinityScroll = (onLoadMore, {
  contentRef = {},
  disabled = false
} = {}) => {

  useLayoutEffect(()=> {
    if (!disabled && contentRef.current && typeof onLoadMore === 'function') {
      let scrollTarget = contentRef.current.offsetParent;

      if (scrollTarget) {
        if (scrollTarget === document.body) {
          scrollTarget = window;
        }
        const handleScroll = (evt) => {
          const botttomRefPos = contentRef.current.clientTop + contentRef.current.clientHeight;
          const scrollBottomPos = document.documentElement.scrollTop + document.documentElement.clientHeight
          if (botttomRefPos - scrollBottomPos < 0) {
            onLoadMore(evt);
          }
        }
        scrollTarget.addEventListener('scroll', handleScroll, true);
        return () => {
          scrollTarget.removeEventListener('scroll', handleScroll, true);
        }
      }
    }
  }, [contentRef, onLoadMore, disabled]);
}

export default useInfinityScroll;

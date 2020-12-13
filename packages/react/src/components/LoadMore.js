import { useCallback } from 'react';
import useInfinityScroll from '../hooks/useInfinityScroll'
import styled from 'styled-components';
import Spinner from './Spinner';

export const LoadMore = ({
  contentRef,
  className,
  loading,
  auto,
  onLoadMore
}) => {

  useInfinityScroll(onLoadMore, {
    disabled: !auto || loading,
    contentRef
  })

  const handleClick = useCallback((evt) => {
    if (!auto && typeof onLoadMore === 'function') {
      onLoadMore(evt)
    }
  }, [auto, onLoadMore]);

  return (
    <div className={className}>
      <button onClick={handleClick} disabled={loading}>
        {loading ? <Spinner /> : <span>Load more</span>}
      </button>
    </div>
  )
}

export default styled(LoadMore)`
  span {
    opacity: 0.5;
  }
  button {
    background: #EFEFEF;
    outline: none;
    border: none;
    border-radius: 0.2rem;
    width: 100%;
    height: 3rem;
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
    }
  }
  svg {
    height: 100%;
  }
`;

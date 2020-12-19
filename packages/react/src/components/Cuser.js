// Core
import { Suspense } from 'react';
import styled from 'styled-components';
// Components
import ErrorBoundary from './ErrorBoundary'
import Messages from './Messages';
import MessageWriter from './MessageWriter';

export const Cuser = ({
  className,
  style,
  ...restProps
}) => {
  return (
    <div className={className} style={style}>
      <ErrorBoundary>
        <MessageWriter {...restProps} />
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={'loading'}>
          <Messages {...restProps} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default styled(Cuser)`
  font-family: sans-serif;
  /* overflow: scroll; */
  /* height: 20rem; */
`

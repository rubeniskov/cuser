// Core
// import { useRef, useCallback } from 'react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary'
import styled from 'styled-components';
// Components
import Messages from './Messages';
import MessageWriter from './MessageWriter';

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export const Cuser = ({
  className,
  topicId ,
  ...restProps
}) => {
  return (
    <div className={className}>
      <MessageWriter topicId={topicId} />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Messages topicId={topicId} {...restProps} />
      </ErrorBoundary>
    </div>
  )
}

export default styled(Cuser)`
  font-family: sans-serif;
  /* overflow: scroll; */
  /* height: 20rem; */
`

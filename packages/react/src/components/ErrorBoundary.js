import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <pre>{error.stack}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

const ErrorBoundary = ({
  children,
  fallback = ErrorFallback
}) => (
  <ReactErrorBoundary FallbackComponent={fallback}>
    {children}
  </ReactErrorBoundary>
);

export default ErrorBoundary;

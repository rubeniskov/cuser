import styled from 'styled-components';

const ErrorBanner = ({ error, className }) => {

  if (error && /invalid signature/.test(error.message)) {
    error = new Error('User token is outdated, please relogin');
  }

  return error
    ? <pre className={className}>{[error.message, error.extendedInfo].filter(Boolean).join('\n')}</pre>
    : null
}

export default styled(ErrorBanner)`
  background-color: #EFEFEF;
  padding: 1rem;
  color: red;
`;

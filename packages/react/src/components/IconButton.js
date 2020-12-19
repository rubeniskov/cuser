import styled from 'styled-components';

export const IconButton = ({ children, ...restProps }) => (
  <button {...restProps}>
    {children}
  </button>
);

export default styled(IconButton)`
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0 0.1rem;
  margin: 0.1rem;
  opacity: 0.5;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }
  & > svg {
    width: 1rem;
  }
`;

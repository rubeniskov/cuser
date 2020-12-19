import styled from 'styled-components';


export const LinkButton = ({ children, ...restProps }) => <a href='#' {...restProps}>{children}</a>

export default styled(LinkButton)`
  text-decoration: none;
  color: #0a9fff;
  &:visited {
    color: #0a9fff;
  }
`;

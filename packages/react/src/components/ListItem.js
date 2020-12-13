import styled from 'styled-components';

export const ListItem = ({ className, side, children }) => {
  return (
    <div className={className}>
    <div className="side">{side}</div>
    <div className="content">
      {children}
    </div>
  </div>
  )
}

export default styled(ListItem)`
  display: flex;
  flex-flow: row;
  margin-bottom: 0.5rem;
  position: 'relative';
  .side {
    margin-right: 1rem;
  }
  .content {
    flex-grow: 1;
  }
`;

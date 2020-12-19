import styled from 'styled-components';
import ErrorBanner from './ErrorBanner';

export const ListItem = ({ className, error, side, children, actions }) => {
  return (
    <div className={className}>
      <div className="content-box">
        <div className="side">{side}</div>
        <div className="content">
          {children}
          {actions && <div className="actions">
              {actions}
          </div>}
        </div>
      </div>
      <ErrorBanner error={error} />
  </div>
  )
}

export default styled(ListItem)`
  .content-box {
    display: flex;
    flex-flow: row;
    margin-bottom: 0.5rem;
    position: relative;
  }
  .side {
    margin-right: 1rem;
    width: 4rem;
  }
  .content {
    flex-grow: 1;
  }
  .actions {
    text-align: right;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    margin-left: -0.5rem;
    margin-right: -0.5rem;
    > * {
      margin: 0 0.5rem;
    }
  }
`;

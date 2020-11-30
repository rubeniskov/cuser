import styled, { keyframes } from 'styled-components';
import clsx from 'clsx';
import humanElapsed from 'human-elapsed';
import Avatar from './Avatar';
import ListItem from './ListItem';

export const Message = ({ id,
  loading,
  className,
  content = {},
  user = {},
  mdate
}) => (
  <ListItem className={clsx(className, { loading })} side={<Avatar loading={loading} avatar={user.avatar} />}>
    <span className="user-username">{user.username}</span>
    <br />
    <small className="elapsed-time">{humanElapsed(new Date().getTime() - mdate)}</small>
    <p className="content-data">{content.data}</p>
  </ListItem>
);


const placeHolderShimmer = keyframes`
0%{
  background-position: -468px 0
}
100%{
  background-position: 468px 0
}
`

export default styled(Message)`
  .user-username {
    display: inline-block;
    font-weight: bold;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
  }
  .elapsed-time {
    display: inline-block;
    opacity: 0.5;
  }
  .content{
    flex-grow: 1;
  }
  .content-data {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    opacity: 0.8;
  }
  &.loading {
    .user-username, .elapsed-time, .content-data {
      background-color: #EFEFEF;
      height: 1rem;
      min-width: 10rem;
      animation-duration: 1.5s;
      animation-delay: .5s;
      animation-fill-mode: forwards;
      animation-iteration-count: infinite;
      animation-name: ${placeHolderShimmer};
      animation-timing-function: linear;
      background: darkgray;
      background: linear-gradient(to right, #eeeeee 10%, #dddddd 18%, #eeeeee 33%);
      background-size: 800px 104px;
    }
    .user-username {
      min-width: 25rem;
    }
    img {
      filter: grayscale(1);
    }
  }
`

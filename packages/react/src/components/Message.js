// @ts-check

import { useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import clsx from 'clsx';
import moment from 'moment';
import Avatar from './Avatar';
import ListItem from './ListItem';
import MessageActions from './MessageActions';
import MarkdownPreview from './MarkdownPreview';
import MessageUpdater from './MessageUpdater';

export const Message = ({
  editMode = false,
  id,
  loading,
  className,
  content = {},
  user = {},
  peerId,
  cdate,
  mdate,
  ...restProps
}) => {

  const elapsedTimeText = useMemo(() => {
    let elapsed = moment.duration(new Date().getTime() - mdate).humanize();
    if (mdate - cdate > 1000) {
      elapsed = `edited ${elapsed}`;
    }
    return elapsed;
  }, [
    cdate,
    mdate
  ]);

  return (
    <ListItem
      className={clsx(className, { loading })}
      actions={
        <MessageActions
          {...restProps}
          messageId={id}
          peerId={peerId}
          disabled={!peerId || editMode}
          user={user}
        />
      }
      side={
        <Avatar className="user-avatar"
          loading={loading}
          avatar={user.avatar}
        />
      }
    >
      <span className="user-username">{user.username}</span>
      <br />
      <small className="elapsed-time">{!loading && elapsedTimeText}</small>
      {
        editMode
          ? <MessageUpdater {...restProps} data={content.data} messageId={id}/>
          : <MarkdownPreview className="content-data">{content.data}</MarkdownPreview>
      }
    </ListItem>
  )
};


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
  .user-avatar {
    width: 3em;
  }
  .elapsed-time {
    display: inline-block;
    opacity: 0.5;
  }
  .content{
    border-bottom: solid 1px #efefef;
    margin-bottom: 1rem;
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

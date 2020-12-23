// @ts-check

/** @typedef {import('../hooks/useAuth').CuserAuthHookOptions} CuserAuthHookOptions */
/** @typedef {import('../hooks/usePublishMessage').CuserPublishMessageHookOptions} CuserPublishMessageHookOptions */

// Core
import { forwardRef, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import createHash from '../utils/hash';
// Hooks
import useAuth from '../hooks/useAuth';
import usePublishMessage from '../hooks/usePublishMessage';
import useReplyMessage from '../hooks/useReplyMessage';
// Components
import Avatar from './Avatar';
import ListItem from './ListItem';
import Login from './Login';
import Status from './Status';
import PublisherInput from './PublisherInput';
import LinkButton from './LinkButton';

/**
 * @typedef {Object} MessageWriterProps
 * @prop {String} className
 */

/**
 * @param {import('react').PropsWithoutRef<MessageWriterProps & CuserAuthHookOptions & CuserPublishMessageHookOptions>} props
 */
export const MessageWriter = ({
  className,
  ...restProps
}) => {
  const replayer = useReplyMessage(restProps);
  const { auth, user, authenticate, logout } = useAuth(restProps);
  const { result: publisher, publishMessage } = usePublishMessage(restProps);
  const { data: accessToken } = auth;
  const { data: { avatar, username } = {} } = user;
  const { data: { value: publishPointer } = {} } = publisher;

  let error = user.error || auth.error || publisher.error;
  const loading = user.loading || auth.loading || publisher.loading;

  const hash = useMemo(() => createHash(publishPointer + replayer.value),[publishPointer, replayer.value]);
  const replyTo = useMemo(() => replayer.value ? `@${replayer.value}` : '', [replayer.value]);

  useEffect(() => {
    replayer.clear();
  }, [publishPointer]);

  const handlePublish = useCallback((_, value) => {
    publishMessage(value);
  }, []);

  const handleLogin = useCallback((_, payload) => authenticate(payload), []);

  return (
    <div className={className}>
      <h4 className='title'>{accessToken ? `Welcome ${username}` : `Please login to publish messages`} <Status className='status' {...restProps}/></h4>
      {accessToken ?
      <ListItem
        error={error}
        side={<Avatar avatar={avatar} loading={user.loading || auth.loading} />}
        actions={<LinkButton onClick={logout}>Logout</LinkButton>}>
        <PublisherInput
        key={hash}
        defaultValue={replyTo}
        loading={loading}
        onSend={handlePublish}
      />
      </ListItem> :
      <Login onLogin={handleLogin} className={className} />
    }
    </div>
  )
}

export default styled(MessageWriter)`
  .actions > * {
    margin-right: 15px;
  }
  .title {
    position: relative;
  }
  .status {
    position: absolute;
    right: 0.5rem;
    top: 50%;
  }
`;

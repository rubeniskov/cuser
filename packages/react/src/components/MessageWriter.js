// @ts-check

/** @typedef {import('../hooks/useAuth').CuserAuthHookOptions} CuserAuthHookOptions */
/** @typedef {import('../hooks/usePublishMessage').CuserPublishMessageHookOptions} CuserPublishMessageHookOptions */

// Core
import { forwardRef, useCallback } from 'react';
// Hooks
import useAuth from '../hooks/useAuth';
import usePublishMessage from '../hooks/usePublishMessage';
// Components
import Avatar from './Avatar';
import ListItem from './ListItem';
import Login from './Login';
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
  const { auth, user, authenticate, logout } = useAuth(restProps);
  const { result: publisher, publishMessage } = usePublishMessage(restProps);
  const { data: accessToken } = auth;
  const { data: { avatar, username } = {} } = user;
  const { data: { value: hash = '' } = {} } = publisher;

  let error = user.error || auth.error || publisher.error;
  const loading = user.loading || auth.loading || publisher.loading;

  const handlePublish = useCallback((_, value) => {
    publishMessage(value);
  }, []);

  const handleLogin = useCallback((_, payload) => authenticate(payload), []);

  return (
    <div className={className}>
      <h3>{accessToken ? `Welcome ${username}` : `Please login to publish messages`}</h3>
      {accessToken ?
      <ListItem
        error={error}
        side={<Avatar avatar={avatar} loading={user.loading || auth.loading} />}
        actions={<LinkButton onClick={logout}>Logout</LinkButton>}>
        <PublisherInput key={hash.slice(-15)} defaultValue={'@nice'} loading={loading} onSend={handlePublish}/>
      </ListItem> :
      <Login onLogin={handleLogin} className={className} />
    }
    </div>
  )
}

export default MessageWriter;

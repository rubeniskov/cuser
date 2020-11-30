// Core
import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
// Hooks
import useAuth from '../hooks/useAuth';
import usePublishMessage from '../hooks/usePublishMessage';
// Components
import Avatar from './Avatar';
import ListItem from './ListItem';
import Spinner from './Spinner';

export const MessageWriter = ({ topicId, className }) => {
  const [ value, setValue ] = useState('');
  const [ authenticate, auth ] = useAuth();
  const [ publishMessage, publisher ] = usePublishMessage({ topicId });

  const { data: { accessToken, avatar } = {} } = auth;

  const error = auth.error || publisher.error;
  const loading = auth.loading || publisher.loading;

  useEffect(() => {
    if(publisher.loading) {
      setValue('');
    }
  }, [publisher.loading]);

  const handleChange = useCallback((evt) => setValue(evt.target.value), []);
  const handlePublish = useCallback(() => publishMessage(value), [value]);
  const handleKeyDown = useCallback((evt) => evt.which === 13 && publishMessage({ content: value, accessToken }), [accessToken, value]);

  return (
    <div className={className}>
      {error && <pre>{[error.message, error.extendedInfo].filter(Boolean).join('\n')}</pre>}
    {accessToken ?
    <div><ListItem side={<Avatar avatar={avatar} />}>
      <input type="text" disabled={loading} onKeyUp={handleKeyDown} onChange={handleChange} value={value} placeholder="Write a comment" />
      <button disabled={!value || loading} onClick={handlePublish}>
        {!loading && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          {null/* Font Awesome Free 5.15.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) */}
          <path d="M440 6.5L24 246.4c-34.4 19.9-31.1 70.8 5.7 85.9L144 379.6V464c0 46.4 59.2 65.5 86.6 28.6l43.8-59.1 111.9 46.2c5.9 2.4 12.1 3.6 18.3 3.6 8.2 0 16.3-2.1 23.6-6.2 12.8-7.2 21.6-20 23.9-34.5l59.4-387.2c6.1-40.1-36.9-68.8-71.5-48.9zM192 464v-64.6l36.6 15.1L192 464zm212.6-28.7l-153.8-63.5L391 169.5c10.7-15.5-9.5-33.5-23.7-21.2L155.8 332.6 48 288 464 48l-59.4 387.3z"/>
        </svg>}
        {loading && <Spinner />}
      </button>
      {error && <div>{error.message}</div>}

    </ListItem>
      <div style={{textAlign: 'right'}}><a href='#' onClick={() => auth.logout()}>Logout</a></div>
    </div> :
    <div className={className}>
      <input type="text" placeholder="username"></input>
      <button onClick={() => authenticate({ username: 'pepe', avatar: 'https://www.w3schools.com/w3images/avatar3.png' })}>Login</button>
    </div>
    }
    </div>
  )
}


export default styled(MessageWriter)`
  position: relative;
  pre {
    background-color: #EFEFEF;
    padding: 1rem;
    color: red;
  }
  a {
    text-decoration: none;
    color: #0a9fff;
    &:visited {
      color: #0a9fff;
    }
  }
  input {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 0.5rem;
    font-size: 1rem;
    border-color: #efefef;
    border-style: solid;
    border-radius: 0.5rem;
    outline: none;
    &:focus {
      border-color: #0a9fff;
    }
    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: #cecece;
      opacity: 1; /* Firefox */
    }
  }

  button {
    background: none;
    border: none;
    position: absolute;
    top: 0;
    right: 0;
    line-height: 3rem;
    padding: 0 1rem;
    margin: 0.1rem;
    cursor: pointer;
    opacity: 0.5;
    color: #0a9fff;
    &:disabled {
      opacity: 0.2;
      color: #cecece;
      cursor: not-allowed;
    }
    &:hover {
      opacity: 1;
    }
    svg {
      width: 1.5rem;
      fill: currentColor;
      display: inline-block;
      vertical-align: middle;
    }
  }
`;

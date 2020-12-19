import { useCallback, useState } from 'react';
import styled from 'styled-components';
import AvatarUploader from './AvatarUploader';
import ListItem from './ListItem';
import LinkButton from './LinkButton';
import TextField from './TextField';
import PrivacyPolicyModal from './PrivacyPolicyModal';

const PrivacyPolicy = styled(({ accepted, onChange, className }) => {
  const [modalPrivacyPolicy, setPrivacyPolicy] = useState(false);

  return (
    <span className={className}>
      <input type="checkbox" checked={accepted} onChange={onChange} />
      Accept <LinkButton onClick={() => setPrivacyPolicy(true)}>privacy policy</LinkButton>
      <PrivacyPolicyModal open={modalPrivacyPolicy} onClose={() => setPrivacyPolicy(false)} />
    </span>
  )
})`
input {
  width: 1rem;
  height: 1rem;
  vertical-align: text-top;
  cursor: pointer;
  margin: 0 0.5rem;
}
`

const Login = ({
  className,
  onLogin = () => {}
}) => {
  const [username, setUsername] = useState('');
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [error, setError] = useState();
  const [avatar, setAvatar] = useState();

  const handleUsernameChange = useCallback((evt) => setUsername(evt.target.value), []);

  const handleAcceptedPolicy = useCallback((evt) => {
    const { checked } = evt.target;
    if (checked) setError(null);
    setAcceptedPolicy(checked)
  },[]);

  const handleLoginClick = useCallback((evt) => {
    if (username.length < 3) {
      return setError(new Error('Username must be at least 3 characteres of length'));
    }

    if (!acceptedPolicy) {
      return setError(new Error('You have to accept the privacy policy to publish messages'));
    }

    onLogin(evt, {
      username,
      avatar
    });
  }, [onLogin, username, avatar, acceptedPolicy]);

  return (
    <ListItem className={className}
      error={error}
      side={
        <AvatarUploader onLoad={(_, value) => setAvatar(value)}/>
      }
      actions={
        <PrivacyPolicy accepted={acceptedPolicy} onChange={handleAcceptedPolicy}/>
      }
      >
      <TextField value={username} onChange={handleUsernameChange} placeholder="username" />
      <button onClick={handleLoginClick}>Login</button>
    </ListItem>
  )
}

export default styled(Login)`
position: relative;

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
`;;

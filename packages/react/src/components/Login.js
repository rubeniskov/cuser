import { useCallback, useState } from 'react';
import AvatarUploader from './AvatarUploader';
import ListItem from './ListItem';

const Login = ({
  className,
  onLogin = () => {}
}) => {
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(`https://www.w3schools.com/w3images/avatar${~~(Math.random() * 3 + 1)}.png`);
  const handleUsernameChange = useCallback((evt) => setUsername(evt.target.value), []);
  const handleClick = useCallback((evt) => onLogin(evt, {
    username,
    avatar
  }), [onLogin, username, avatar]);

  return (
    <ListItem className={className} side={<AvatarUploader onLoad={(_, value) => setAvatar(value)}/>}>
      <input type="text" value={username} onChange={handleUsernameChange} placeholder="username"></input>
      <button onClick={handleClick}>Login</button>
    </ListItem>
  )
}

module.exports = Login;

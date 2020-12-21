import isIPFS from 'is-ipfs';
import styled from 'styled-components';
import Spinner from './Spinner';

const dummyProfile = 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png';

export const Avatar = ({
  className,
  loading,
  avatar
}) => {
  if (isIPFS.cid(avatar)) {
    avatar = `https://cloudflare-ipfs.com/ipfs/${avatar}`;
  }
  return (
    <div className={className}>
      {loading ? <Spinner/> : <img src={avatar} />}
    </div>
  )
};

export default styled(Avatar)`
  & > img {
    width: 3rem;
    border-radius: 50%;
    border: solid #efefef 1px;
  }
`

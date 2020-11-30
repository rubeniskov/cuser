import styled from 'styled-components';

const dummyProfile = 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png';

export const Avatar = ({
  className,
  loading,
  avatar
}) => (
  <div className={className}><img src={loading ? dummyProfile : avatar} /></div>
);

export default styled(Avatar)`
  & > img {
    width: 100%;
    border-radius: 50%;
  }
`

import { jsx as _jsx } from "react/jsx-runtime";
import styled from 'styled-components';
const dummyProfile = 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png';
export const Avatar = ({
  className,
  loading,
  avatar
}) => /*#__PURE__*/_jsx("div", {
  className: className,
  children: /*#__PURE__*/_jsx("img", {
    src: loading ? dummyProfile : avatar
  })
});
export default styled(Avatar)`
  & > img {
    width: 100%;
    border-radius: 50%;
  }
`;
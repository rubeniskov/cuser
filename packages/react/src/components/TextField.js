import styled from 'styled-components';

const TextField = ({ ...props }) => {
  return <input {...props} type="text" />
}

export default styled(TextField)`
  width: 100%;
  height: 3rem;
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
`;

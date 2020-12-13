import styled from 'styled-components';
import { useCallback, useState } from 'react';

export const AvatarUploader = ({
  className,
  onLoad = () => {},
  onError = () => {}
}) => {

  const [img, setImg] = useState();

  const handleUpload = useCallback((evt) => {
    const file = evt.target.files[0];
    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function(evt) {
      const data = 'data:image/svg+xml;base64,' + global.btoa(reader.result);
      onLoad(evt, data);
      setImg(data);
    };

    reader.onerror = function() {
      onError(reader.error);
    };

  }, []);

  return (
    <div className={className}>
      {
      img
        ? <img src={img} />
        : <>
            <input type="file" onChange={handleUpload} />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            {null/* Font Awesome Free 5.15.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) */}
              <path d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/>
            </svg>
          </>
      }
    </div>
  )
};

export default styled(AvatarUploader)`
  background-color: #efefef;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  position: relative;
  cursor: pointer;
  & > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.4;
  }
  & > input[type=file] {
    outline: none;
    border: none;
    width: 100%;
    height: 100%;
    opacity: 0;
    padding: 0;
    margin: 0;
  }
`

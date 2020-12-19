import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import UploadIcon from '../icons/UploadIcon';

const isUploadSupported = () => {
  return !navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)
}

const resizeFitImage = (data, width, height, cb) => {
  const image = new Image();
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  image.src = data;
  image.onload = () => {
    var scale = Math.max(canvas.width / image.width, canvas.height / image.height);
    var x = (canvas.width / 2) - (image.width / 2) * scale;
    var y = (canvas.height / 2) - (image.height / 2) * scale;
    ctx.drawImage(image,
        x, y,
        image.width * scale, image.height * scale);
    canvas.toBlob((blob) => {
      cb(null, blob)
    });
  }

  image.onerror = () => {
    cb(new Error('Error resizing image'));
  }
}

const defaultAvatarGenerator = () => `https://www.w3schools.com/w3images/avatar${~~(Math.random() * 3 + 1)}.png`;
export const AvatarUploader = ({
  className,
  avatarGenerator = defaultAvatarGenerator,
  onLoad = () => {},
  onError = () => {}
}) => {

  const [avatar, setAvatar] = useState(avatarGenerator());

  const handleUpload = useCallback((evt) => {
    const file = evt.target.files[0];
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);

    reader.onload = function(evt) {
      const encoded = Buffer.from(reader.result).toString('base64');
      const data = `data:${file.type};base64,${encoded}`;

      resizeFitImage(data, 300, 300, (err, blob) => {
        if (err) return onError(err);
        onLoad(evt, blob);
        const reader = new FileReader();
        reader.onload = () => {
          const ed = Buffer.from(reader.result).toString('base64');
          const dt = `data:${blob.type};base64,${ed}`;
          setAvatar(dt);
        }
        reader.readAsArrayBuffer(blob);
      });
    };

    reader.onerror = function() {
      onError(reader.error);
    };

  }, []);

  const handleChangeAvatar = useCallback((evt) => {
    const avatar = avatarGenerator();
    setAvatar(avatar);
    onLoad(evt, avatar);
  }, []);

  useEffect(() => {
    onLoad(null, avatar);
  }, [])

  const supported = isUploadSupported();

  return (
    <div className={className}>
      <img src={avatar} onClick={handleChangeAvatar} />
      {supported && <>
        <label htmlFor="avatar" aria-label="Upload an image" title="Upload an image">
          <UploadIcon />
        </label>
        <input id="avatar" type="file" onChange={handleUpload} accept="image/*"/>
      </>}
    </div>
  )
};

export default styled(AvatarUploader)`
  position: relative;
  display: inline;
  & img {
    width: 3rem;
    border-radius: 50%;
    border: solid #efefef 1px;
    cursor: alias;
  }
  & label {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background-color: #fbfbfb;
    display: block;
    position: absolute;
    right: -0.8rem;
    bottom: 0;
    cursor: pointer;
    border: solid 1px #EFEFEF;
  }
  & label > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.4;
    width: 1rem;
    height: 1rem;
  }
  & > input[type=file] {
    outline: none;
    border: none;
    width: 0;
    height: 0;
    opacity: 0;
    padding: 0;
    margin: 0;
  }
`

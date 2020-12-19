// @ts-check

/** @typedef {import('react').SyntheticEvent} SyntheticEvent */
/** @typedef {import('react').ReactNode} ReactNode */

// Core
import { forwardRef, useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
// Components
import Spinner from './Spinner';
import PlaneIcon from '../icons/PlaneIcon';

/**
 * @typedef {Object} PublisherInputProps
 * @prop {String} [className]
 * @prop {ReactNode} [children]
 * @prop {Boolean} [loading]
 * @prop {String} [defaultValue]
 * @prop {(evt: SyntheticEvent, value: String) => void} [onSend]
 */


/**
 * @param {import('react').PropsWithRef<PublisherInputProps>} props
 */
export const PublisherInput = forwardRef((props, ref) => {
  /** @type {PublisherInputProps} */
  const {
    className,
    loading,
    defaultValue = '',
    onSend,
  } = props;

  const [ value, setValue ] = useState(defaultValue);
  const textareaRef = useRef();

  const handleChange = useCallback((evt) => {
    const { value } = evt.target;
    setValue(value);
  }, []);

  const checkDiff = useCallback((value) => value !== defaultValue, [defaultValue]);
  const handleClick = useCallback((evt) => checkDiff(value) && onSend(evt, value), [onSend, value]);
  const handleKeyDown = useCallback((evt) => {
    if (onSend && evt.altKey && evt.which === 13) {
      onSend(evt, value);
    }
  }, [onSend, value]);

  return (
    <div ref={ref} className={className}>
      <textarea
        ref={textareaRef}
        style={{ height: !textareaRef.current ? 'auto' : textareaRef.current.scrollHeight + 'px' }}
        disabled={loading}
        onKeyUp={handleKeyDown}
        onChange={handleChange}
        value={value}
        placeholder="Write a comment"
      />
      <button disabled={!checkDiff(value) || loading} onClick={handleClick}>
        { loading ? <Spinner /> : <PlaneIcon /> }
      </button>
    </div>
  )
})

export default styled(PublisherInput)`
  position: relative;
  border-color: #efefef;
  border-style: solid;
  border-radius: 0.5rem;
  textarea {
    display: block;
    background: none;
    height: 3rem;
    width: 100%;
    max-height: 40rem;
    font-family: inherit;
    box-sizing: border-box;
    padding: 0.5rem;
    font-size: 1rem;
    outline: none;
    border: none;
    resize: none;
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
    bottom: 0;
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

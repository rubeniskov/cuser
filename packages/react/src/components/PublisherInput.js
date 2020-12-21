// @ts-check

/** @typedef {import('react').SyntheticEvent} SyntheticEvent */
/** @typedef {import('react').ReactNode} ReactNode */

// Core
import { forwardRef, useCallback, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
// Hooks
import useFocus from '../hooks/useFocus';
// Components
import Spinner from './Spinner';
import IconButton from './IconButton';
import PlaneIcon from '../icons/PlaneIcon';
import ItalicIcon from '../icons/ItalicIcon';
import ListIcon from '../icons/ListIcon';
import BoldIcon from '../icons/BoldIcon';
import ScratchIcon from '../icons/ScratchIcon';
import CodeIcon from '../icons/CodeIcon';
import LinkIcon from '../icons/LinkIcon';
import HighlightIcon from '../icons/HighlightIcon';
import MarkdownIcon from '../icons/MarkdownIcon';

/**
 * @typedef {Object} PublisherInputProps
 * @prop {String} [className]
 * @prop {ReactNode} [children]
 * @prop {Boolean} [loading]
 * @prop {Function} [onBlur]
 * @prop {String} [defaultValue]
 * @prop {Number} [maxLength=512]
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
    onBlur = () => {},
    onSend,
    maxLength = 1024,
  } = props;

  const wrapperRef = useRef();
  const textareaRef = useRef();
  const focused = useFocus(wrapperRef, (evt, focused) => !focused && onBlur(evt));

  const [ value, setValue ] = useState(defaultValue);

  const handleChange = useCallback((evt) => {
    const { value } = evt.target;
    if (value.length <= maxLength) {
      setValue(value);
    }
  }, []);

  const checkDiff = useCallback((value) => value !== defaultValue, [defaultValue]);
  const handleClick = useCallback((evt) => checkDiff(value) && onSend(evt, value), [onSend, value]);
  const handleKeyDown = useCallback((evt) => {
    if (onSend && evt.altKey && evt.which === 13) {
      onSend(evt, value);
    }
  }, [onSend, value]);

  const symbols = {
    'bold': (value) => `**${value}**`,
    'italic': (value) => `_${value}_`,
    'scratch': (value) => `~~${value}~~`,
    'list': (value) => value.split(/\n+/).map((v) => `- ${v}`).join('\n'),
    'highlight': (value) => `\`${value}\``,
    'code': (value) => ['```', value, '```'].join('\n'),
    'link': (value) => `[link](${value})`
  }

  const handleAction = (evt) => {
    const { selectionStart, selectionEnd } = textareaRef.current;
    const selection = value.substring(selectionStart, selectionEnd)
    let pvalue = value.substring(0, selectionStart);
    pvalue += symbols[evt.currentTarget.id](selection);
    pvalue += value.substring(selectionEnd);
    setValue(pvalue);
    textareaRef.current.focus();
  }

  return (
    <div ref={wrapperRef} className={clsx(className, { 'focused': focused })}>
      <MarkdownIcon className='markdown-trademark'/>
      <textarea
        ref={textareaRef}
        disabled={loading}
        onKeyUp={handleKeyDown}
        onChange={handleChange}
        value={value}
        placeholder='Write a comment'
      />
      <div className='editor-actions'>
        <IconButton id="bold" onClick={handleAction}>
          <BoldIcon />
        </IconButton>
        <IconButton id="italic" onClick={handleAction}>
          <ItalicIcon />
        </IconButton>
        <IconButton id="scratch" onClick={handleAction}>
          <ScratchIcon />
        </IconButton>
        <IconButton id="link" onClick={handleAction}>
          <LinkIcon />
        </IconButton>
        <IconButton id="list" onClick={handleAction}>
          <ListIcon />
        </IconButton>
        <IconButton id="highlight" onClick={handleAction}>
          <HighlightIcon />
        </IconButton>
        <IconButton id="code" onClick={handleAction}>
          <CodeIcon />
        </IconButton>
        <IconButton className='btn-send' disabled={!checkDiff(value) || loading} onClick={handleClick}>
          { loading ? <Spinner /> : <PlaneIcon /> }
        </IconButton>
        <small className='leyend'>Alt+Enter to send</small>
        <small className='remain'>Remain {maxLength - value.length}</small>
      </div>
    </div>
  )
})

export default styled(PublisherInput)`
  position: relative;
  border-color: #efefef;
  border-style: solid;
  border-radius: 0.5rem;
  .markdown-trademark {
    position: absolute;
    width: 1rem;
    top: 5px;
    right: 5px;
    opacity: 0.3;
  }
  textarea {
    transition: min-height 200ms linear;
    display: block;
    background: none;
    min-height: 3rem;
    width: 100%;
    max-height: 20rem;
    font-family: inherit;
    box-sizing: border-box;
    padding: 0.5rem;
    font-size: 1rem;
    outline: none;
    border: none;
    resize: none;
    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: #cecece;
      opacity: 1; /* Firefox */
    }
  }
  &.focused textarea {
      border-color: #0a9fff;
      min-height: 10rem;
    }
  .editor-actions {
    background: #efefef;
    font-size: 1.5rem;
    opacity: 0;
    height: 0;
    transition: opacity 200ms linear;
    > button {
      margin: 0 0.5rem;
    }
  }
  &.focused .editor-actions {
    height: auto;
    opacity: 1;
  }
  .leyend {
    position: absolute;
    bottom: 30px;
    right: 0;
    font-size: 0.5rem;
    margin: 0 0.2rem;
    opacity: 0.2;
  }
  .remain {
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-size: 0.75rem;
    margin: 0 0.2rem;
    opacity: 0.2;
  }
  .btn-send {
    background: none;
    border: none;
    position: absolute;
    bottom: 2.5rem;
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

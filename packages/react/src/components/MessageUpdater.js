// @ts-check

import { useCallback, useEffect, useRef } from 'react';
import PublisherInput from './PublisherInput';
import useUpdateMessage from '../hooks/useUpdateMessage';

const MessageUpdater = ({
  messageId,
  data,
  onAbort,
  ...restProps
}) => {
  const publisherRef = useRef();
  const { result, updateMessage } = useUpdateMessage(restProps);

  const handleUpdate = useCallback((_, value) => {
    updateMessage(messageId, value);
  }, [messageId]);

  useEffect(() => {
    if (onAbort && publisherRef.current) {
      const listener = (evt) => {
        if (!evt.path.includes(publisherRef.current)) {
          onAbort(evt)
        }
      };
      document.body.addEventListener('click', listener);
      return () => {
        document.body.removeEventListener('click', listener);
      }
    }
  }, [publisherRef])

  return <PublisherInput
    ref={publisherRef}
    loading={result.loading}
    onSend={handleUpdate}
    defaultValue={data}
  />
}

export default MessageUpdater;

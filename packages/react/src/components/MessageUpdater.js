// @ts-check

import { useCallback, useRef } from 'react';
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

  const handleBlur = useCallback((evt) => {
    if (onAbort) {
      onAbort(evt);
    }
  }, [onAbort]);

  return <PublisherInput
    ref={publisherRef}
    onBlur={handleBlur}
    loading={result.loading}
    onSend={handleUpdate}
    defaultValue={data}
  />
}

export default MessageUpdater;

import { useCallback } from 'react';
import useDeleteMessage from '../hooks/useDeleteMessage';
import IconButton from './IconButton';
import ReplayIcon from '../icons/ReplayIcon';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';
import Spinner from './Spinner';

export const MessagePublishActions = ({
  disabled,
  peerId,
  topicId,
  messageId,
  user,
  onEdit,
}) => {

  const { result, deleteMessage } = useDeleteMessage({
    topicId
  });

  const handleDelete = useCallback(() => deleteMessage(messageId), [messageId]);
  const handleEdit = useCallback((evt) => onEdit(evt, messageId), [messageId]);

  if (result.loading) {
    return <Spinner />
  }

  return user.peerId === peerId && (
    <>
      <IconButton onClick={handleEdit} disabled={disabled}>
        <ReplayIcon/>
      </IconButton>
      <IconButton onClick={handleDelete} disabled={disabled}>
        <PencilIcon />
      </IconButton>
    </>
  )
}

export const MessageActions = ({ onReply, disabled, ...props }) => {
  return (
    <>
      <IconButton onClick={onReply} disabled={disabled}>
        <TrashIcon />
      </IconButton>
      <MessagePublishActions {...props} disabled={disabled}/>
    </>
  )
}

export default MessageActions;

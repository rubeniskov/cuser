// Core
import { useCallback } from 'react';
// Hooks
import useDeleteMessage from '../hooks/useDeleteMessage';
import useReplyMessage from '../hooks/useReplyMessage';
// Icons
import ReplayIcon from '../icons/ReplayIcon';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';
// Components
import IconButton from './IconButton';
import Spinner from './Spinner';

export const MessagePublishActions = ({
  disabled,
  peerId,
  messageId,
  user,
  onEdit,
  ...restPpts
}) => {

  const { result, deleteMessage } = useDeleteMessage(restPpts);

  const handleDelete = useCallback(() => deleteMessage(messageId), [messageId]);
  const handleEdit = useCallback((evt) => onEdit(evt, messageId), [messageId]);

  if (result.loading) {
    return <Spinner />
  }

  return user.peerId === peerId && (
    <>
      <IconButton title="Edit message" onClick={handleEdit} disabled={disabled}>
        <ReplayIcon/>
      </IconButton>
      <IconButton title="Delete message" onClick={handleDelete} disabled={disabled}>
        <PencilIcon />
      </IconButton>
    </>
  )
}

export const MessageActions = ({ disabled, user, ...props }) => {

  const { replyTo } = useReplyMessage({
    attach: false
  });

  return (
    <>
      <IconButton title="Reply message" onClick={() => {
        replyTo(user.username);
      }} disabled={disabled}>
        <TrashIcon />
      </IconButton>
      <MessagePublishActions user={user} {...props} disabled={disabled}/>
    </>
  )
}

export default MessageActions;

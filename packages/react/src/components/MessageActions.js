// Core
import { useCallback } from 'react';
// Hooks
import useDeleteMessage from '../hooks/useDeleteMessage';
import useReplayMessage from '../hooks/useReplayMessage';
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

export const MessageActions = ({ disabled, user, ...props }) => {

  const { replayTo } = useReplayMessage({
    attach: false
  });

  return (
    <>
      <IconButton onClick={() => {
        replayTo(user.username);
      }} disabled={disabled}>
        <TrashIcon />
      </IconButton>
      <MessagePublishActions user={user} {...props} disabled={disabled}/>
    </>
  )
}

export default MessageActions;

import { useMemo } from 'react';
import context from '../utils/context';
const Provider = context.Provider;

const CuserProvider = ({
  client,
  topicId,
  children,
}) => {
  const value = useMemo(() => ({ client, topicId }), [topicId, client])
  return <Provider value={value}>{children}</Provider>
}

export default CuserProvider;

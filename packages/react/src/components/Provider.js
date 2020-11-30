import { useMemo } from 'react';
import context from '../utils/context';
const Provider = context.Provider;

const CuserProvider = ({
  client,
  children,
}) => {
  const value = useMemo(() => ({ client }), [client])
  return <Provider value={value}>{children}</Provider>
}

export default CuserProvider;

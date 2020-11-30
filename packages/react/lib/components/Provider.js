import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import context from '../utils/context';
const Provider = context.Provider;

const CuserProvider = ({
  client,
  children
}) => {
  const value = useMemo(() => ({
    client
  }), [client]);
  return /*#__PURE__*/_jsx(Provider, {
    value: value,
    children: children
  });
};

export default CuserProvider;
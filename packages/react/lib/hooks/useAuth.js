import { useCallback, useMemo } from 'react';
import useCuser from './useCuser';
import usePromiseResolver from './usePromiseResolver';

const useAuth = () => {
  const {
    client,
    cache
  } = useCuser();
  const resolver = useCallback(variables => client.authenticate(variables).then(authResult => {
    const result = { ...variables,
      ...authResult
    };
    cache.put('@cuser/auth', result);
    return result;
  }), [client, cache]);
  const [authenticate, auth] = usePromiseResolver(resolver, {
    data: cache.get('@cuser/auth')
  });
  const logout = useCallback(() => {
    cache.remove('@cuser/auth');
    auth.clean();
  }, [cache, auth]);
  return [authenticate, useMemo(() => ({ ...auth,
    logout
  }), [auth, logout])];
};

export default useAuth;
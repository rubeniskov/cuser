import { useCallback, useMemo } from 'react' ;
import useCuser from './useCuser';
import usePromiseResolver from './usePromiseResolver';


const useAuth = () => {
  const { client, cache } = useCuser();

  const resolver = useCallback(({ username, avatar }) => client.authenticate(username, avatar).then((authResult) => {
    const result = { username, avatar, ...authResult };
    cache.put('@cuser/auth', result);
    return result;
  }), [client, cache]);

  const [authenticate, auth] = usePromiseResolver(resolver, {
    data: cache.get('@cuser/auth')
  });

  const logout = useCallback(() => {
    cache.remove('@cuser/auth');
    auth.clean();
  }, [cache, auth])

  return [
    authenticate,
    useMemo(() => ({
      ...auth,
      logout
    }), [auth, logout]),
  ];
}

export default useAuth;

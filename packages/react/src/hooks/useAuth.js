// @ts-check

/** @typedef {import('./useCuser').CuserHookOptions} CuserHookOptions */

import { useCallback, useMemo } from 'react' ;
import useCuser from './useCuser';
import usePromiseResolver from './usePromiseResolver';

/** @typedef {CuserHookOptions} CuserAuthHookOptions */

/**
 *
 * @param {CuserAuthHookOptions} [opts]
 */
const useAuth = (opts) => {
  const { client, cache } = useCuser(opts);

  const resolverAuth = useCallback(({ username, avatar }) => client.authenticate(username, avatar)
    .then(({ accessToken }) => {
      cache.put('@cuser/auth', accessToken);
      return accessToken;
  }), [
    client,
    cache
  ]);

  const auth = usePromiseResolver(resolverAuth, {
    data: cache.get('@cuser/auth'),
    lazy: true,
  });

  const resolverUser = useCallback(({ accessToken }) => client.getUserByAccessToken(accessToken), [
    client
  ]);

  const user = usePromiseResolver(resolverUser, {
    variables: { accessToken: auth.data },
    lazy: !auth.data
  });

  const logout = useCallback(() => {
    cache.remove('@cuser/auth');
    auth.clean();
  }, [cache, auth]);

  const authenticate = useCallback((variables) => auth.refetch({ variables }), [auth, auth.data && auth.data.accessToken]);

  return useMemo(() => ({
    logout,
    authenticate,
    auth,
    user,
  }), [user, auth, logout, authenticate])
}

export default useAuth;

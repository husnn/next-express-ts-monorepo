import React, { useCallback, useEffect, useState } from 'react';
import {
  getCurrentUser,
  removeAuth,
  saveAuthExpiry,
  saveCurrentUser,
  shouldUnauthenticate
} from './utils';

import { CurrentUserDTO } from '@starter/shared';
import { useRouter } from 'next/router';
import { signout } from '../api/auth';
import { getUserInfo } from '../api/user';

type AuthContextProps = {
  isAuthenticated: boolean;
  currentUser: CurrentUserDTO | undefined;
  setAuthentication: (user: CurrentUserDTO, expiry: number) => void;
  signoutAndClear: () => void;
  redirect: (path?: string) => void;
  fetchUserInfo: () => Promise<void>;
};

export const AuthContext = React.createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider = ({
  children,
  authRedirect = '/'
}: {
  children: React.ReactNode;
  authRedirect?: string;
}) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUserDTO>();

  const router = useRouter();
  const redirect = useCallback(
    (path: string = authRedirect) => router.push(path),
    [router]
  );

  const clearAuth = useCallback(() => {
    setAuthenticated(false);
    setCurrentUser(undefined);
    removeAuth();
  }, []);

  const signoutAndClear = useCallback(() => {
    signout().finally(() => clearAuth());
  }, [clearAuth]);

  useEffect(() => {
    if (shouldUnauthenticate()) {
      clearAuth();
      return;
    }

    setAuthenticated(true);
    setCurrentUser(getCurrentUser());
  }, [clearAuth]);

  const setAuthentication = useCallback(
    (user: CurrentUserDTO, expiry: number) => {
      setCurrentUser(user);
      setAuthenticated(true);
      saveAuthExpiry(expiry);
      saveCurrentUser(user);
    },
    []
  );

  const fetchUserInfo = useCallback(async () => {
    const info = await getUserInfo();

    const { user } = info.body!;

    saveCurrentUser(user);
    setCurrentUser(user);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        setAuthentication,
        signoutAndClear,
        redirect,
        fetchUserInfo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

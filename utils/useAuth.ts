import { useCallback, useEffect, useState } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { DB } from './db';
import { delay } from './common';

export const useAuth = () => {
  const [firstLoading, setFirstLoading] = useState(true);

  const [isAuth, setAuth] = useState(!!DB.auth.currentUser);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const subscribe = onAuthStateChanged(DB.auth, (user) => {
      setFirstLoading(false);
      if (user) {
        setAuth(!!user);
      } else {
        setAuth(false);
      }
    });
    return subscribe;
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    await delay(300);
    await DB.auth.signOut();
    setLoading(false);
  }, []);

  const auth = useCallback(async (email: string, pass: string) => {
    setLoading(true);
    await delay(300);
    await DB.emailPassAuth(email, pass);
    setLoading(false);
  }, []);

  return { auth, isAuth, logout, isLoading, firstLoading } as const;
};

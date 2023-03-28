import React, { useCallback, useEffect, useState } from 'react';
import { Portal } from './Portal';
import { DocsComponentInput } from './DocsComponentInput';
import { useAuth } from '../utils/useAuth';
import { AdminButton } from './adminPanel/AdminButton';

export const AuthModal = () => {
  const { isAuth, auth, isLoading, logout } = useAuth();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const setValue = useCallback((func: (text: string) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
    func(event.target.value);
  }, []);

  const submit = useCallback(async () => {
    await auth(email, pass);
  }, [auth, email, pass]);

  // useEffect(() => {
  //   if (isAuth) {
  //     setTimeout(logout, 3000);
  //   }
  // }, [isAuth, logout]);

  return (
    <Portal isVisible={!isAuth}>
      <div className={'auth'}>
        <DocsComponentInput text={'email'} value={email} onChange={setValue(setEmail)} />
        <DocsComponentInput text={'пароль'} value={pass} onChange={setValue(setPass)} type={'password'} />

        <AdminButton onClick={submit} text={'Войти'} stretch isLoading={isLoading} />
      </div>
    </Portal>
  );
};

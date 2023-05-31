import React, { useCallback, useState } from 'react';
import { Portal } from './Portal';
import { DocsComponentInput } from './DocsComponentInput';
import { useAuth } from '../utils/useAuth';
import { AdminButton } from './adminPanel/AdminButton';
import Loader from './Loader';
import {reduxForm} from "redux-form";

export const AuthModal = reduxForm({
  form: 'auth',
  destroyOnUnmount: false,
})(({handleSubmit}) => {
  const { isAuth, auth, isLoading, firstLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const setValue = useCallback((func: (text: string) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
    func(event.target.value);
  }, []);

  const submit = useCallback(async () => {
    await auth(email, pass);
  }, [auth, email, pass]);

  return (

    <Portal isVisible={!isAuth}>
      {firstLoading ? (
        <Loader isVisible />
        ) : (
        <div className={'auth'}>
          <DocsComponentInput text={'email'} name={"email"}  />
          <DocsComponentInput text={'пароль'} name={"pass"}  type={'password'} />

          <AdminButton onClick={submit} text={'Войти'} stretch isLoading={isLoading} />
        </div>
      )}
    </Portal>
  );
});

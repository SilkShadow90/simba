import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store, persistor } from '../redux';
import { Toast } from '../components/Toast';
import { ToastService } from '../utils/ToastService';
import { PersistGate } from 'redux-persist/integration/react'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
         <div id="portal" />
        <Toast ref={ToastService.ref} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;

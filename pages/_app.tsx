import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../redux';
import { Toast } from '../components/Toast';
import { ToastService } from '../utils/ToastService';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <div id="portal" />
      <Toast ref={ToastService.ref} />
    </Provider>
  );
}

export default MyApp;

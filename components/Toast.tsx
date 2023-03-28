import { useEffect, useState, useImperativeHandle, forwardRef, useLayoutEffect } from 'react';
import classNames from 'classnames';
import styles from '../styles/Toast.module.css';

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export type ToastRefAttributes = {
  showToast(text: string, type?: ToastType): void
  setDelay(delay: number): void
}


type ToastItem = {
  text: string
  type: ToastType
  timestamp: Date
}

export const Toast = forwardRef<ToastRefAttributes>((_, ref) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [delay, setDelay] = useState<number>(3000);

  useImperativeHandle(ref, () => ({
    showToast: (text: string, type: ToastType = 'info') => {
      setToasts(prevState => prevState.concat({ text, type, timestamp: new Date() }));
    },
    setDelay: (newDelay) => {
      setDelay(newDelay);
    },
  }), []);

  useEffect(() => {
    const interval = setInterval(() => {
      setToasts(prevState => prevState.filter((toast) => {
        return (Number(new Date()) - Number(toast.timestamp)) < delay;
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [delay]);

  if (!toasts.length) {
    return null;
  }

  return (
    <div className={styles.toastContainer}>
      {toasts.map((toast) => (
        <div className={classNames(styles.toast, styles?.[toast.type])} key={Number(toast.timestamp)}>
          {toast.text}
        </div>
      ))}
    </div>
  );
});

Toast.displayName = 'Toast';

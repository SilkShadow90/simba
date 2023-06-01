import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import classNames from 'classnames';
import styles from '../styles/Toast.module.css';

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export type ToastRefAttributes = {
  showToast(text: string, type?: ToastType): void
  setDelay(delay: number): void
}


type ToastItemProps = {
  text: string
  type: ToastType
  timestamp: number
}

const ToastItem = React.memo(({ type, timestamp, text }: ToastItemProps) => (
  <div className={classNames(styles.toast, styles?.[type])} key={timestamp}>
    {text}
  </div>
));

ToastItem.displayName = 'ToastItem';

export const Toast = forwardRef<ToastRefAttributes>((_, ref) => {
  const [toasts, setToasts] = useState<ToastItemProps[]>([]);
  const [delay, setDelay] = useState<number>(3000);

  useImperativeHandle(ref, () => ({
    showToast: (text: string, type: ToastType = 'info') => {
      setToasts(prevState => [...prevState, { text, type, timestamp: Number(new Date()) }]);
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
    }, delay);

    return () => clearInterval(interval);
  }, [delay]);

  if (!toasts.length) {
    return null;
  }

  return (
    <div className={styles.toastContainer}>
      {toasts.map((toast) => (
        <ToastItem text={toast.text} type={toast.type} timestamp={toast.timestamp} key={toast.timestamp} />
      ))}
    </div>
  );
});

Toast.displayName = 'Toast';

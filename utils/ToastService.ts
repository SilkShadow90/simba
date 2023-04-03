import React, { RefObject } from 'react';
import { ToastRefAttributes, ToastType } from '../components/Toast';

export class ToastService {
  static ref: RefObject<ToastRefAttributes> = React.createRef();

  static show = (text: string, type?: ToastType) =>  {
    ToastService.ref?.current?.showToast(text, type);
  };

  static delay = (ms: number) => {
    ToastService.ref.current?.setDelay(ms);
  };
}

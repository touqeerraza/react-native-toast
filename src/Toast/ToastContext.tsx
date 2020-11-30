import React, { useContext, useRef } from 'react';
import Toast from './index';
import { IToastShow, IToast, ToastContextProps } from '../types';

const ToastContext = React.createContext({} as IToast);

const ToastProvider: React.FC<ToastContextProps> = (props) => {
  const toastRef = useRef(null);
  const show = ({
    delay = 300,
    message = '',
    type = undefined,
  }: IToastShow) => {
    if (toastRef.current) {
      // @ts-ignore
      toastRef.current.show(message, delay, type);
    }
  };
  return (
    <ToastContext.Provider value={{ show }}>
      {props.children}
      <Toast ref={toastRef} />
    </ToastContext.Provider>
  );
};

const ToastConsumer = ToastContext.Consumer;

function useToastContext(): IToast {
  return useContext(ToastContext);
}

export { ToastProvider, useToastContext };

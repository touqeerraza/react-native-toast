import React, { useContext, useRef } from 'react';
import Toast from './index';
import { IToastShow, IToast, ToastContextProps } from '../types';

const ToastContext = React.createContext({} as IToast);

const ToastProvider: React.FC<ToastContextProps> = (props) => {
  const toastRef = useRef(null);
  const show = ({
    delay,
    message,
    position,
    bottomOffset,
    topOffset,
    backgroundColor,
    textColor,
    type,
    icon,
  }: IToastShow = {}) => {
    if (toastRef.current) {
      // @ts-ignore
      toastRef.current.show({
        delay,
        message,
        position,
        bottomOffset,
        topOffset,
        backgroundColor,
        textColor,
        type,
        icon,
      });
    }
  };
  return (
    <ToastContext.Provider value={{ show }}>
      {props.children}
      <Toast ref={toastRef} defaultTheme={props.defaultTheme} />
    </ToastContext.Provider>
  );
};

function useToastContext(): IToast {
  return useContext(ToastContext);
}

export { ToastProvider, useToastContext };

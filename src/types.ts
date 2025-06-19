import { JSX, ReactNode } from 'react';

export interface ToastContextProps {
  children?: any;
  defaultTheme?: IToastShow;
}

export interface IToast {
  show(arg?: IToastShow): any;
}

export interface ToastProps {
  ref: any;
  defaultTheme?: IToastShow;
}

export interface IToastShow {
  showToast?: boolean;
  delay?: number;
  message?: string;
  bottomOffset?: number;
  topOffset?: number;
  position?: 'bottom' | 'top';
  backgroundColor?: string;
  textColor?: string;
  type?: 'success';
  icon?: JSX.Element | ReactNode;
}

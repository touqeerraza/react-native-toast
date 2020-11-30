declare global {
  interface Window {
    google: any;
    [key: string]: any;
  }
}

export interface ToastContextProps {
  children?: any;
}

export interface IToastShow {
  delay?: number;
  message: string;
  type?: 'success';
}

export interface IToast {
  show(arg: IToastShow): any;
}

export interface ToastProps {
  message?: any;
  delay?: number;
  ref: any;
}

export interface IState {
  showToast: boolean;
  delay: number;
  message: string;
  bottomSpace: number;
  topSpace: number;
  position: 'bottom' | 'top' | string;
}

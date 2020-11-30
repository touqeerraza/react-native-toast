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

import React from 'react';
import { IToast, ToastContextProps } from '../types';
declare const ToastProvider: React.FC<ToastContextProps>;
declare function useToastContext(): IToast;
export { ToastProvider, useToastContext };

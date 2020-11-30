/**
 *
 * Toast
 *
 */
import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useReducer,
} from 'react';
// @ts-ignore
import { Animated, Text } from 'react-native';
import style from './style';
import { ToastProps, IToastShow } from '../types';

const initialState = {
  showToast: false,
  delay: 1000,
  message: 'Welcome to react-native-js-toast',
  bottomSpace: 32,
  topSpace: 32,
  position: 'bottom',
};

const stateReducer = (state: IToastShow, action: any): IToastShow => {
  switch (action.type) {
    case 'SHOW_TOAST':
      return {
        ...state,
        showToast: action.payload,
      };
    case 'UPDATE_ALL':
      return {
        ...state,
        message: action.payload.message,
        delay: action.payload.delay | initialState.delay,
        bottomSpace: action.payload.bottomSpace | initialState.bottomSpace,
        topSpace: action.payload.topSpace | initialState.topSpace,
        position: action.payload.position
          ? action.payload.position
          : state.position,
      };

    default:
      return initialState;
  }
};

const Toast: React.FC<ToastProps> = forwardRef((_props, ref) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useImperativeHandle(ref, () => ({
    show({ message, delay, bottomSpace, topSpace, position }: IToastShow) {
      if (message) {
        dispatch({
          type: 'UPDATE_ALL',
          payload: {
            message,
            delay,
            bottomSpace,
            topSpace,
            position,
          },
        });
      }
      dispatch({
        type: 'SHOW_TOAST',
        payload: true,
      });
    },
  }));

  useEffect(() => {
    if (state.showToast) {
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 600,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 600,
          delay: state.delay,
          useNativeDriver: false,
        }),
      ]).start(() =>
        dispatch({
          type: 'SHOW_TOAST',
          payload: false,
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.showToast]);

  return (
    <Animated.View
      style={[
        style.toastWrapper,
        { opacity: animatedValue },
        state.position === 'bottom'
          ? { bottom: state.bottomSpace }
          : { top: state.topSpace },
      ]}
    >
      <Text style={[style.toastMessage]}>{state.message}</Text>
    </Animated.View>
  );
});

export default React.memo(Toast);

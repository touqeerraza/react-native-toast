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
  message: 'Toast Message',
  bottomOffset: 32,
  topOffest: 32,
  position: 'bottom',
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  textColor: '#ffffff',
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
        bottomOffset: action.payload.bottomOffset | initialState.bottomOffset,
        topOffset: action.payload.topSpace | initialState.topOffest,
        backgroundColor: action.payload.backgroundColor
          ? action.payload.backgroundColor
          : state.backgroundColor,
        textColor: action.payload.textColor
          ? action.payload.textColor
          : state.textColor,
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
    show({
      message,
      delay,
      bottomOffset,
      topOffset,
      position,
      backgroundColor,
      textColor,
    }: IToastShow) {
      if (message) {
        dispatch({
          type: 'UPDATE_ALL',
          payload: {
            message,
            delay,
            bottomOffset,
            topOffset,
            position,
            backgroundColor,
            textColor,
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
        state.position === 'bottom' ? { bottom: state.bottomOffset } : null,
        state.position === 'top' ? { bottom: state.topOffset } : null,
        state.backgroundColor !== initialState.backgroundColor
          ? { backgroundColor: state.backgroundColor }
          : null,
      ]}
    >
      <Text
        style={[
          style.toastMessage,
          state.textColor !== initialState.textColor
            ? { color: state.textColor }
            : null,
        ]}
      >
        {state.message}
      </Text>
    </Animated.View>
  );
});

export default React.memo(Toast);

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
import { Animated, Text, Image } from 'react-native';
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
  type: '',
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
          : initialState.backgroundColor,
        textColor: action.payload.textColor
          ? action.payload.textColor
          : initialState.textColor,
        position: action.payload.position
          ? action.payload.position
          : initialState.position,
        type: action.payload.type ? action.payload.type : initialState.type,
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
      type,
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
            type,
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
      {state.type === 'success' ? (
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/asaeed14/react-native-toast/main/src/success.png',
          }}
          style={style.successImage}
        />
      ) : null}
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

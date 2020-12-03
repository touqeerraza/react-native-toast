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
  useCallback,
  useMemo,
} from 'react';
// @ts-ignore
import { Animated, Text, Image } from 'react-native';
import style from './style';
import { ToastProps, IToastShow } from '../types';

const Toast: React.FC<ToastProps> = forwardRef((props, ref) => {
  const initialState = useMemo(
    () =>
      ({
        showToast: false,
        delay: props.defaultTheme?.delay || 1000,
        message: props.defaultTheme?.message || 'This is toast message',
        bottomOffset: props.defaultTheme?.bottomOffset || 32,
        topOffset: props.defaultTheme?.topOffset || 32,
        position: props.defaultTheme?.position || 'bottom',
        backgroundColor:
          props.defaultTheme?.backgroundColor || 'rgba(0, 0, 0, 0.75)',
        textColor: props.defaultTheme?.textColor || '#ffffff',
        type: props.defaultTheme?.type || undefined,
      } as IToastShow),
    [props.defaultTheme],
  );

  const stateReducer = useCallback(
    (state: IToastShow, action: any): IToastShow => {
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
            delay: action.payload.delay
              ? action.payload.delay
              : initialState.delay,
            topOffset: action.payload.topOffset
              ? action.payload.topOffset
              : initialState.topOffset,
            bottomOffset: action.payload.bottomOffset
              ? action.payload.bottomOffset
              : initialState.bottomOffset,
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
    },
    [initialState],
  );

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
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 600,
          delay: state.delay,
          useNativeDriver: true,
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

  if (!state.showToast) {
    return null;
  }

  return (
    <Animated.View
      style={[
        style.toastWrapper,
        { opacity: animatedValue },
        state.position === 'bottom'
          ? {
              transform: [
                {
                  translateY: animatedValue.interpolate({
                    inputRange: [0, 1],
                    // @ts-ignore
                    outputRange: [0, -state.bottomOffset],
                  }),
                },
              ],
            }
          : null,
        // state.position === 'top' ? { bottom: state.topOffset } : null,
        state.position === 'top'
          ? {
              transform: [
                {
                  translateY: animatedValue.interpolate({
                    inputRange: [0, 1],
                    // @ts-ignore
                    outputRange: [0, state.topOffset],
                  }),
                },
              ],
            }
          : null,
        { backgroundColor: state.backgroundColor },
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
      <Text style={[style.toastMessage, { color: state.textColor }]}>
        {state.message}
      </Text>
    </Animated.View>
  );
});

export default React.memo(Toast);

/**
 *
 * Toast
 *
 */
import React, {
  useEffect,
  useRef,
  forwardRef,
  useState,
  useImperativeHandle,
} from 'react';
// @ts-ignore
import { Animated, Text } from 'react-native';
import style from './style';
import { ToastProps } from '../types';

const Toast: React.FC<ToastProps> = forwardRef((props, ref) => {
  const [showToast, setShowToast] = useState(false);
  const [delay, setDelay] = useState(300);
  // const [toastType, setToastType] = useState('');
  const [message, setMessage] = useState(props.message);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useImperativeHandle(ref, () => ({
    show(msg: string, time: number) {
      if (msg) {
        setMessage(msg);
        setDelay(time);
        // setToastType(type);
      }
      setShowToast(true);
    },
  }));

  useEffect(() => {
    if (showToast) {
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 300,
          delay,
          useNativeDriver: false,
        }),
      ]).start(() => setShowToast(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showToast]);

  return (
    <Animated.View style={[style.toastWrapper, { opacity: animatedValue }]}>
      <Text style={[style.toastMessage]}>{message}</Text>
    </Animated.View>
  );
});

export default React.memo(Toast);

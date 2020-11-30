// @ts-ignore
import { StyleSheet, Platform } from 'react-native';

const style = StyleSheet.create({
  toastWrapper: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 12,
    textAlign: 'center',
    zIndex: 100000000000,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 6,
  },
  toastMessage: {
    color: '#ffffff',
    fontWeight: '600',
  },
  animation: {
    width: 40,
    height: 40,
  },
});

export default style;

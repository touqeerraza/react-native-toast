// @ts-ignore
import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  toastWrapper: {
    position: 'absolute',
    bottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 12,
    textAlign: 'center',
    zIndex: 100000000000,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    justifyContent: 'space-between',
  },
  toastMessage: {
    color: 'rgba(0, 0, 0, 0.94)',
    fontWeight: '600',
  },
  animation: {
    width: 40,
    height: 40,
  },
});

export default style;

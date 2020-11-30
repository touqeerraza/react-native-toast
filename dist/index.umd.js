(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-native')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-native'], factory) :
  (factory((global.index = {}),global.React,global.reactNative));
}(this, (function (exports,React,reactNative) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;

  // @ts-ignore
  var style = reactNative.StyleSheet.create({
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

  /**
   *
   * Toast
   *
   */
  var Toast = React.forwardRef(function (props, ref) {
      var _a = React.useState(false), showToast = _a[0], setShowToast = _a[1];
      var _b = React.useState(300), delay = _b[0], setDelay = _b[1];
      // const [toastType, setToastType] = useState('');
      var _c = React.useState(props.message), message = _c[0], setMessage = _c[1];
      var animatedValue = React.useRef(new reactNative.Animated.Value(0)).current;
      React.useImperativeHandle(ref, function () { return ({
          show: function (msg, time) {
              if (msg) {
                  setMessage(msg);
                  setDelay(time);
                  // setToastType(type);
              }
              setShowToast(true);
          },
      }); });
      React.useEffect(function () {
          if (showToast) {
              reactNative.Animated.sequence([
                  reactNative.Animated.timing(animatedValue, {
                      toValue: 1,
                      duration: 200,
                      useNativeDriver: false,
                  }),
                  reactNative.Animated.timing(animatedValue, {
                      toValue: 0,
                      duration: 300,
                      delay: delay,
                      useNativeDriver: false,
                  }),
              ]).start(function () { return setShowToast(false); });
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [showToast]);
      return (React__default.createElement(reactNative.Animated.View, { style: [style.toastWrapper, { opacity: animatedValue }] },
          React__default.createElement(reactNative.Text, { style: [style.toastMessage] }, message)));
  });
  var Toast$1 = React__default.memo(Toast);

  var ToastContext = React__default.createContext({});
  var ToastProvider = function (props) {
      var toastRef = React.useRef(null);
      var show = function (_a) {
          var _b = _a.delay, delay = _b === void 0 ? 300 : _b, _c = _a.message, message = _c === void 0 ? '' : _c, _d = _a.type, type = _d === void 0 ? undefined : _d;
          if (toastRef.current) {
              // @ts-ignore
              toastRef.current.show(message, delay, type);
          }
      };
      return (React__default.createElement(ToastContext.Provider, { value: { show: show } },
          props.children,
          React__default.createElement(Toast$1, { ref: toastRef })));
  };
  var ToastConsumer = ToastContext.Consumer;
  function useToastContext() {
      return React.useContext(ToastContext);
  }

  exports.ToastProvider = ToastProvider;
  exports.useToastContext = useToastContext;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.umd.js.map

import React, { useEffect, useRef, forwardRef, useState, useImperativeHandle, useContext } from 'react';
import { StyleSheet, Animated, Text } from 'react-native';

// @ts-ignore
var style = StyleSheet.create({
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
var Toast = forwardRef(function (props, ref) {
    var _a = useState(false), showToast = _a[0], setShowToast = _a[1];
    var _b = useState(300), delay = _b[0], setDelay = _b[1];
    // const [toastType, setToastType] = useState('');
    var _c = useState(props.message), message = _c[0], setMessage = _c[1];
    var animatedValue = useRef(new Animated.Value(0)).current;
    useImperativeHandle(ref, function () { return ({
        show: function (msg, time) {
            if (msg) {
                setMessage(msg);
                setDelay(time);
                // setToastType(type);
            }
            setShowToast(true);
        },
    }); });
    useEffect(function () {
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
                    delay: delay,
                    useNativeDriver: false,
                }),
            ]).start(function () { return setShowToast(false); });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showToast]);
    return (React.createElement(Animated.View, { style: [style.toastWrapper, { opacity: animatedValue }] },
        React.createElement(Text, { style: [style.toastMessage] }, message)));
});
var Toast$1 = React.memo(Toast);

var ToastContext = React.createContext({});
var ToastProvider = function (props) {
    var toastRef = useRef(null);
    var show = function (_a) {
        var _b = _a.delay, delay = _b === void 0 ? 300 : _b, _c = _a.message, message = _c === void 0 ? '' : _c, _d = _a.type, type = _d === void 0 ? undefined : _d;
        if (toastRef.current) {
            // @ts-ignore
            toastRef.current.show(message, delay, type);
        }
    };
    return (React.createElement(ToastContext.Provider, { value: { show: show } },
        props.children,
        React.createElement(Toast$1, { ref: toastRef })));
};
var ToastConsumer = ToastContext.Consumer;
function useToastContext() {
    return useContext(ToastContext);
}

export { ToastProvider, useToastContext };
//# sourceMappingURL=index.es5.js.map

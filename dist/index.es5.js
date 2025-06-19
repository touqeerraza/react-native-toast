import React, { useEffect, useRef, forwardRef, useImperativeHandle, useReducer, useCallback, useMemo, useContext } from 'react';
import { StyleSheet, Platform, Animated, Text, Image, View } from 'react-native';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var style = StyleSheet.create({
    toastWrapper: __assign({ position: 'absolute', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', padding: 12, textAlign: 'center', zIndex: 100000000000, backgroundColor: 'rgba(0, 0, 0, 0.75)', borderRadius: 6 }, Platform.select({
        ios: {
            shadowColor: '#000000',
            shadowOpacity: 3 * 0.08,
            shadowRadius: 12,
            shadowOffset: {
                width: 0,
                height: 6,
            },
            overflow: 'visible',
        },
        android: {
            elevation: 2,
        },
    })),
    toastMessage: {
        color: '#ffffff',
        fontWeight: '600',
    },
    animation: {
        width: 40,
        height: 40,
    },
    successImage: {
        width: 25,
        height: 25,
        marginRight: 8,
    },
});

var Toast = forwardRef(function (props, ref) {
    var initialState = useMemo(function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return ({
            showToast: false,
            delay: ((_a = props.defaultTheme) === null || _a === void 0 ? void 0 : _a.delay) || 1000,
            message: ((_b = props.defaultTheme) === null || _b === void 0 ? void 0 : _b.message) || 'This is toast message',
            bottomOffset: ((_c = props.defaultTheme) === null || _c === void 0 ? void 0 : _c.bottomOffset) || 32,
            topOffset: ((_d = props.defaultTheme) === null || _d === void 0 ? void 0 : _d.topOffset) || 32,
            position: ((_e = props.defaultTheme) === null || _e === void 0 ? void 0 : _e.position) || 'bottom',
            backgroundColor: ((_f = props.defaultTheme) === null || _f === void 0 ? void 0 : _f.backgroundColor) || 'rgba(0, 0, 0, 0.75)',
            textColor: ((_g = props.defaultTheme) === null || _g === void 0 ? void 0 : _g.textColor) || '#ffffff',
            type: ((_h = props.defaultTheme) === null || _h === void 0 ? void 0 : _h.type) || undefined,
            icon: ((_j = props.defaultTheme) === null || _j === void 0 ? void 0 : _j.icon) || undefined,
        });
    }, [props.defaultTheme]);
    var stateReducer = useCallback(function (state, action) {
        switch (action.type) {
            case 'SHOW_TOAST':
                return __assign(__assign({}, state), { showToast: action.payload });
            case 'UPDATE_ALL':
                return __assign(__assign({}, state), { message: action.payload.message, delay: action.payload.delay
                        ? action.payload.delay
                        : initialState.delay, topOffset: action.payload.topOffset
                        ? action.payload.topOffset
                        : initialState.topOffset, bottomOffset: action.payload.bottomOffset
                        ? action.payload.bottomOffset
                        : initialState.bottomOffset, backgroundColor: action.payload.backgroundColor
                        ? action.payload.backgroundColor
                        : initialState.backgroundColor, textColor: action.payload.textColor
                        ? action.payload.textColor
                        : initialState.textColor, position: action.payload.position
                        ? action.payload.position
                        : initialState.position, type: action.payload.type ? action.payload.type : initialState.type });
            default:
                return initialState;
        }
    }, [initialState]);
    var _a = useReducer(stateReducer, initialState), state = _a[0], dispatch = _a[1];
    var animatedValue = useRef(new Animated.Value(0)).current;
    useImperativeHandle(ref, function () { return ({
        show: function (_a) {
            var message = _a.message, delay = _a.delay, bottomOffset = _a.bottomOffset, topOffset = _a.topOffset, position = _a.position, backgroundColor = _a.backgroundColor, textColor = _a.textColor, type = _a.type, icon = _a.icon;
            if (message) {
                dispatch({
                    type: 'UPDATE_ALL',
                    payload: {
                        message: message,
                        delay: delay,
                        bottomOffset: bottomOffset,
                        topOffset: topOffset,
                        position: position,
                        backgroundColor: backgroundColor,
                        textColor: textColor,
                        type: type,
                        icon: icon,
                    },
                });
            }
            dispatch({
                type: 'SHOW_TOAST',
                payload: true,
            });
        },
    }); });
    useEffect(function () {
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
            ]).start(function () {
                return dispatch({
                    type: 'SHOW_TOAST',
                    payload: false,
                });
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.showToast]);
    if (!state.showToast) {
        return null;
    }
    return (React.createElement(Animated.View, { style: [
            style.toastWrapper,
            { opacity: animatedValue },
            state.position === 'bottom'
                ? {
                    bottom: 0,
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
        ] },
        state.icon ? (React.createElement(View, { style: { marginRight: 8 } }, state.icon)) : state.type === 'success' ? (React.createElement(Image, { source: {
                uri: 'https://raw.githubusercontent.com/asaeed14/react-native-toast/main/src/success.png',
            }, style: style.successImage })) : null,
        React.createElement(Text, { style: [style.toastMessage, { color: state.textColor }] }, state.message)));
});
var Toast$1 = React.memo(Toast);

var ToastContext = React.createContext({});
var ToastProvider = function (props) {
    var toastRef = useRef(null);
    var show = function (_a) {
        var _b = _a === void 0 ? {} : _a, delay = _b.delay, message = _b.message, position = _b.position, bottomOffset = _b.bottomOffset, topOffset = _b.topOffset, backgroundColor = _b.backgroundColor, textColor = _b.textColor, type = _b.type, icon = _b.icon;
        if (toastRef.current) {
            // @ts-ignore
            toastRef.current.show({
                delay: delay,
                message: message,
                position: position,
                bottomOffset: bottomOffset,
                topOffset: topOffset,
                backgroundColor: backgroundColor,
                textColor: textColor,
                type: type,
                icon: icon,
            });
        }
    };
    return (React.createElement(ToastContext.Provider, { value: { show: show } },
        props.children,
        React.createElement(Toast$1, { ref: toastRef, defaultTheme: props.defaultTheme })));
};
function useToastContext() {
    return useContext(ToastContext);
}

export { ToastProvider, useToastContext };
//# sourceMappingURL=index.es5.js.map

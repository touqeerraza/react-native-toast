import React, { useEffect, useRef, forwardRef, useImperativeHandle, useReducer, useContext } from 'react';
import { StyleSheet, Platform, Animated, Text, Image } from 'react-native';

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
    toastWrapper: __assign({ position: 'absolute', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', padding: 12, textAlign: 'center', zIndex: 100000000000, backgroundColor: 'rgba(0, 0, 0, 0.75)', borderRadius: 6 }, Platform.slect({
        ios: {
            shadowColor: '#000000',
            shadowOpacity: 2 * 0.08,
            shadowRadius: 8,
            shadowOffset: {
                width: 0,
                height: 4,
            },
            overflow: 'visible',
        },
        android: {
            elevation: 4,
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

var initialState = {
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
var stateReducer = function (state, action) {
    switch (action.type) {
        case 'SHOW_TOAST':
            return __assign(__assign({}, state), { showToast: action.payload });
        case 'UPDATE_ALL':
            return __assign(__assign({}, state), { message: action.payload.message, delay: action.payload.delay | initialState.delay, bottomOffset: action.payload.bottomOffset | initialState.bottomOffset, topOffset: action.payload.topSpace | initialState.topOffest, backgroundColor: action.payload.backgroundColor
                    ? action.payload.backgroundColor
                    : initialState.backgroundColor, textColor: action.payload.textColor
                    ? action.payload.textColor
                    : initialState.textColor, position: action.payload.position
                    ? action.payload.position
                    : initialState.position, type: action.payload.type ? action.payload.type : initialState.type });
        default:
            return initialState;
    }
};
var Toast = forwardRef(function (_props, ref) {
    var _a = useReducer(stateReducer, initialState), state = _a[0], dispatch = _a[1];
    var animatedValue = useRef(new Animated.Value(0)).current;
    useImperativeHandle(ref, function () { return ({
        show: function (_a) {
            var message = _a.message, delay = _a.delay, bottomOffset = _a.bottomOffset, topOffset = _a.topOffset, position = _a.position, backgroundColor = _a.backgroundColor, textColor = _a.textColor, type = _a.type;
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
                    useNativeDriver: false,
                }),
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 600,
                    delay: state.delay,
                    useNativeDriver: false,
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
    return (React.createElement(Animated.View, { style: [
            style.toastWrapper,
            { opacity: animatedValue },
            state.position === 'bottom' ? { bottom: state.bottomOffset } : null,
            state.position === 'top' ? { bottom: state.topOffset } : null,
            state.backgroundColor !== initialState.backgroundColor
                ? { backgroundColor: state.backgroundColor }
                : null,
        ] },
        state.type === 'success' ? (React.createElement(Image, { source: {
                uri: 'https://raw.githubusercontent.com/asaeed14/react-native-toast/main/src/success.png',
            }, style: style.successImage })) : null,
        React.createElement(Text, { style: [
                style.toastMessage,
                state.textColor !== initialState.textColor
                    ? { color: state.textColor }
                    : null,
            ] }, state.message)));
});
var Toast$1 = React.memo(Toast);

var ToastContext = React.createContext({});
var ToastProvider = function (props) {
    var toastRef = useRef(null);
    var show = function (_a) {
        var delay = _a.delay, message = _a.message, position = _a.position, bottomOffset = _a.bottomOffset, topOffset = _a.topOffset, backgroundColor = _a.backgroundColor, textColor = _a.textColor, type = _a.type;
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
            });
        }
    };
    return (React.createElement(ToastContext.Provider, { value: { show: show } },
        props.children,
        React.createElement(Toast$1, { ref: toastRef })));
};
function useToastContext() {
    return useContext(ToastContext);
}

export { ToastProvider, useToastContext };
//# sourceMappingURL=index.es5.js.map

import React, { useEffect, useRef, forwardRef, useImperativeHandle, useReducer, useContext } from 'react';
import { StyleSheet, Animated, Text } from 'react-native';

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

// @ts-ignore
var style = StyleSheet.create({
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

var initialState = {
    showToast: false,
    delay: 1000,
    message: 'Welcome to react-native-js-toast',
    bottomSpace: 32,
    topSpace: 32,
    position: 'bottom',
};
var stateReducer = function (state, action) {
    switch (action.type) {
        case 'SHOW_TOAST':
            return __assign(__assign({}, state), { showToast: action.payload });
        case 'UPDATE_ALL':
            return __assign(__assign({}, state), { message: action.payload.message, delay: action.payload.delay | initialState.delay, bottomSpace: action.payload.bottomSpace | initialState.bottomSpace, topSpace: action.payload.topSpace | initialState.topSpace, position: action.payload.position
                    ? action.payload.position
                    : state.position });
        default:
            return initialState;
    }
};
var Toast = forwardRef(function (_props, ref) {
    var _a = useReducer(stateReducer, initialState), state = _a[0], dispatch = _a[1];
    var animatedValue = useRef(new Animated.Value(0)).current;
    useImperativeHandle(ref, function () { return ({
        show: function (_a) {
            var message = _a.message, delay = _a.delay, bottomSpace = _a.bottomSpace, topSpace = _a.topSpace, position = _a.position;
            if (message) {
                dispatch({
                    type: 'UPDATE_ALL',
                    payload: {
                        message: message,
                        delay: delay,
                        bottomSpace: bottomSpace,
                        topSpace: topSpace,
                        position: position,
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
                    duration: 200,
                    useNativeDriver: false,
                }),
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 300,
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
            state.position === 'bottom'
                ? { bottom: state.bottomSpace }
                : { top: state.topSpace },
        ] },
        React.createElement(Text, { style: [style.toastMessage] }, state.message)));
});
var Toast$1 = React.memo(Toast);

var ToastContext = React.createContext({});
var ToastProvider = function (props) {
    var toastRef = useRef(null);
    var show = function (_a) {
        var delay = _a.delay, message = _a.message, position = _a.position, bottomSpace = _a.bottomSpace, topSpace = _a.topSpace;
        if (toastRef.current) {
            // @ts-ignore
            toastRef.current.show({
                delay: delay,
                message: message,
                position: position,
                bottomSpace: bottomSpace,
                topSpace: topSpace,
            });
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

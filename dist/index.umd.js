(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-native')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-native'], factory) :
    (factory((global.index = {}),global.React,global.reactNative));
}(this, (function (exports,React,reactNative) { 'use strict';

    var React__default = 'default' in React ? React['default'] : React;

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
    var style = reactNative.StyleSheet.create({
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
        message: 'Toast Message',
        bottomOffset: 32,
        topOffest: 32,
        position: 'bottom',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        textColor: '#ffffff',
    };
    var stateReducer = function (state, action) {
        switch (action.type) {
            case 'SHOW_TOAST':
                return __assign(__assign({}, state), { showToast: action.payload });
            case 'UPDATE_ALL':
                return __assign(__assign({}, state), { message: action.payload.message, delay: action.payload.delay | initialState.delay, bottomOffset: action.payload.bottomOffset | initialState.bottomOffset, topOffset: action.payload.topSpace | initialState.topOffest, backgroundColor: action.payload.backgroundColor
                        ? action.payload.backgroundColor
                        : state.backgroundColor, textColor: action.payload.textColor
                        ? action.payload.textColor
                        : state.textColor, position: action.payload.position
                        ? action.payload.position
                        : state.position });
            default:
                return initialState;
        }
    };
    var Toast = React.forwardRef(function (_props, ref) {
        var _a = React.useReducer(stateReducer, initialState), state = _a[0], dispatch = _a[1];
        var animatedValue = React.useRef(new reactNative.Animated.Value(0)).current;
        React.useImperativeHandle(ref, function () { return ({
            show: function (_a) {
                var message = _a.message, delay = _a.delay, bottomOffset = _a.bottomOffset, topOffset = _a.topOffset, position = _a.position, backgroundColor = _a.backgroundColor, textColor = _a.textColor;
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
                        },
                    });
                }
                dispatch({
                    type: 'SHOW_TOAST',
                    payload: true,
                });
            },
        }); });
        React.useEffect(function () {
            if (state.showToast) {
                reactNative.Animated.sequence([
                    reactNative.Animated.timing(animatedValue, {
                        toValue: 1,
                        duration: 600,
                        useNativeDriver: false,
                    }),
                    reactNative.Animated.timing(animatedValue, {
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
        return (React__default.createElement(reactNative.Animated.View, { style: [
                style.toastWrapper,
                { opacity: animatedValue },
                state.position === 'bottom' ? { bottom: state.bottomOffset } : null,
                state.position === 'top' ? { bottom: state.topOffset } : null,
                state.backgroundColor !== initialState.backgroundColor
                    ? { backgroundColor: state.backgroundColor }
                    : null,
            ] },
            React__default.createElement(reactNative.Text, { style: [
                    style.toastMessage,
                    state.textColor !== initialState.textColor
                        ? { color: state.textColor }
                        : null,
                ] }, state.message)));
    });
    var Toast$1 = React__default.memo(Toast);

    var ToastContext = React__default.createContext({});
    var ToastProvider = function (props) {
        var toastRef = React.useRef(null);
        var show = function (_a) {
            var delay = _a.delay, message = _a.message, position = _a.position, bottomOffset = _a.bottomOffset, topOffset = _a.topOffset, backgroundColor = _a.backgroundColor, textColor = _a.textColor;
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
                });
            }
        };
        return (React__default.createElement(ToastContext.Provider, { value: { show: show } },
            props.children,
            React__default.createElement(Toast$1, { ref: toastRef })));
    };
    function useToastContext() {
        return React.useContext(ToastContext);
    }

    exports.ToastProvider = ToastProvider;
    exports.useToastContext = useToastContext;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.umd.js.map

"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * Toast
 *
 */
var react_1 = __importStar(require("react"));
// @ts-ignore
var react_native_1 = require("react-native");
var style_1 = __importDefault(require("./style"));
var Toast = react_1.forwardRef(function (props, ref) {
    var initialState = react_1.useMemo(function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return ({
            showToast: false,
            delay: ((_a = props.defaultTheme) === null || _a === void 0 ? void 0 : _a.delay) || 1000,
            message: ((_b = props.defaultTheme) === null || _b === void 0 ? void 0 : _b.message) || 'This is toast message',
            bottomOffset: ((_c = props.defaultTheme) === null || _c === void 0 ? void 0 : _c.bottomOffset) || 32,
            topOffest: ((_d = props.defaultTheme) === null || _d === void 0 ? void 0 : _d.topOffset) || 32,
            position: ((_e = props.defaultTheme) === null || _e === void 0 ? void 0 : _e.position) || 'bottom',
            backgroundColor: ((_f = props.defaultTheme) === null || _f === void 0 ? void 0 : _f.backgroundColor) || 'rgba(0, 0, 0, 0.75)',
            textColor: ((_g = props.defaultTheme) === null || _g === void 0 ? void 0 : _g.textColor) || '#ffffff',
            type: ((_h = props.defaultTheme) === null || _h === void 0 ? void 0 : _h.type) || undefined,
        });
    }, [props.defaultTheme]);
    var stateReducer = react_1.useCallback(function (state, action) {
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
    var _a = react_1.useReducer(stateReducer, initialState), state = _a[0], dispatch = _a[1];
    var animatedValue = react_1.useRef(new react_native_1.Animated.Value(0)).current;
    react_1.useImperativeHandle(ref, function () { return ({
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
    react_1.useEffect(function () {
        if (state.showToast) {
            react_native_1.Animated.sequence([
                react_native_1.Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                react_native_1.Animated.timing(animatedValue, {
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
    return (react_1.default.createElement(react_native_1.Animated.View, { style: [
            style_1.default.toastWrapper,
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
        ] },
        state.type === 'success' ? (react_1.default.createElement(react_native_1.Image, { source: {
                uri: 'https://raw.githubusercontent.com/asaeed14/react-native-toast/main/src/success.png',
            }, style: style_1.default.successImage })) : null,
        react_1.default.createElement(react_native_1.Text, { style: [style_1.default.toastMessage, { color: state.textColor }] }, state.message)));
});
exports.default = react_1.default.memo(Toast);
//# sourceMappingURL=index.js.map
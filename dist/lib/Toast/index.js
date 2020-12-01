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
var Toast = react_1.forwardRef(function (_props, ref) {
    var _a = react_1.useReducer(stateReducer, initialState), state = _a[0], dispatch = _a[1];
    var animatedValue = react_1.useRef(new react_native_1.Animated.Value(0)).current;
    react_1.useImperativeHandle(ref, function () { return ({
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
    react_1.useEffect(function () {
        if (state.showToast) {
            react_native_1.Animated.sequence([
                react_native_1.Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: false,
                }),
                react_native_1.Animated.timing(animatedValue, {
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
    return (react_1.default.createElement(react_native_1.Animated.View, { style: [
            style_1.default.toastWrapper,
            { opacity: animatedValue },
            state.position === 'bottom' ? { bottom: state.bottomOffset } : null,
            state.position === 'top' ? { bottom: state.topOffset } : null,
            state.backgroundColor !== initialState.backgroundColor
                ? { backgroundColor: state.backgroundColor }
                : null,
        ] },
        react_1.default.createElement(react_native_1.Text, { style: [
                style_1.default.toastMessage,
                state.textColor !== initialState.textColor
                    ? { color: state.textColor }
                    : null,
            ] }, state.message)));
});
exports.default = react_1.default.memo(Toast);
//# sourceMappingURL=index.js.map
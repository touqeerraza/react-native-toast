"use strict";
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
    var _a = react_1.useState(false), showToast = _a[0], setShowToast = _a[1];
    var _b = react_1.useState(300), delay = _b[0], setDelay = _b[1];
    // const [toastType, setToastType] = useState('');
    var _c = react_1.useState(props.message), message = _c[0], setMessage = _c[1];
    var animatedValue = react_1.useRef(new react_native_1.Animated.Value(0)).current;
    react_1.useImperativeHandle(ref, function () { return ({
        show: function (msg, time) {
            if (msg) {
                setMessage(msg);
                setDelay(time);
                // setToastType(type);
            }
            setShowToast(true);
        },
    }); });
    react_1.useEffect(function () {
        if (showToast) {
            react_native_1.Animated.sequence([
                react_native_1.Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: false,
                }),
                react_native_1.Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 300,
                    delay: delay,
                    useNativeDriver: false,
                }),
            ]).start(function () { return setShowToast(false); });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showToast]);
    return (react_1.default.createElement(react_native_1.Animated.View, { style: [style_1.default.toastWrapper, { opacity: animatedValue }] },
        react_1.default.createElement(react_native_1.Text, { style: [style_1.default.toastMessage] }, message)));
});
exports.default = react_1.default.memo(Toast);
//# sourceMappingURL=index.js.map
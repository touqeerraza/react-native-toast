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
exports.useToastContext = exports.ToastProvider = void 0;
var react_1 = __importStar(require("react"));
var index_1 = __importDefault(require("./index"));
var ToastContext = react_1.default.createContext({});
var ToastProvider = function (props) {
    var toastRef = react_1.useRef(null);
    var show = function (_a) {
        var _b = _a === void 0 ? {} : _a, delay = _b.delay, message = _b.message, position = _b.position, bottomOffset = _b.bottomOffset, topOffset = _b.topOffset, backgroundColor = _b.backgroundColor, textColor = _b.textColor, type = _b.type;
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
    return (react_1.default.createElement(ToastContext.Provider, { value: { show: show } },
        props.children,
        react_1.default.createElement(index_1.default, { ref: toastRef, defaultTheme: props.defaultTheme })));
};
exports.ToastProvider = ToastProvider;
function useToastContext() {
    return react_1.useContext(ToastContext);
}
exports.useToastContext = useToastContext;
//# sourceMappingURL=ToastContext.js.map
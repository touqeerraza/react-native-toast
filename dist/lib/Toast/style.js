"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var react_native_1 = require("react-native");
var style = react_native_1.StyleSheet.create({
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
exports.default = style;
//# sourceMappingURL=style.js.map
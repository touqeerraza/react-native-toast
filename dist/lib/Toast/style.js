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
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var react_native_1 = require("react-native");
var style = react_native_1.StyleSheet.create({
    toastWrapper: __assign({ position: 'absolute', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', padding: 12, textAlign: 'center', zIndex: 100000000000, backgroundColor: 'rgba(0, 0, 0, 0.75)', borderRadius: 6 }, react_native_1.Platform.select({
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
exports.default = style;
//# sourceMappingURL=style.js.map
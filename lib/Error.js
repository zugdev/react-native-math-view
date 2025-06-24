"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactNative = require("react-native");

var _common = require("./common");

var ErrorComponent = function ErrorComponent(props) {
    return _react2["default"].createElement(
        _reactNative.View,
        { style: [props.style, _common.styles.multilineText] },
        _react2["default"].createElement(
            _reactNative.Text,
            { style: props.style },
            props.math
        ),
        _react2["default"].createElement(
            _reactNative.Text,
            { style: [props.style, _common.styles.error] },
            props.error
        )
    );
};

exports.ErrorComponent = ErrorComponent;
var MathErrorBoundary = _react2["default"].memo(function (props) {
    var error = props.error;
    var Fallback = props.renderError;
    var onError = props.onError;

    if (_lodash2["default"].every(_lodash2["default"].values(_common.MathError), function (enumo) {
        return enumo !== error.name;
    })) throw error;
    (0, _react.useEffect)(function () {
        if (onError) {
            onError(error);
        } else if (!Fallback && __DEV__) {
            console.warn('react-native-math-view: Parsing Error', error);
        }
    }, [error]);
    return typeof Fallback === 'function' ? _react2["default"].createElement(Fallback, props) : _react2["default"].isValidElement(Fallback) ? _react2["default"].cloneElement(Fallback, { error: error }) : null;
});
exports.MathErrorBoundary = MathErrorBoundary;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var PropTypes = require('prop-types');

var loading_style = {
    position: 'relative',
    margin: '0px auto',
    width: '40px',
    height: '40px'
};

var svg_style = {
    animation: 'rotate 2s linear infinite',
    height: '100%',
    transformOrigin: 'center center',
    width: '100%',
    position: 'absolute',
    top: '45vh',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto'
};

var circle_style = {
    strokeDasharray: '1,200',
    strokeDashoffset: '0',
    animation: 'dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite',
    strokeLinecap: 'round'
};

var animation = '@keyframes rotate {\n    100% {\n        transform: rotate(360deg);\n    }\n}\n@keyframes dash {\n    0% {\n        stroke-dasharray: 1,200;\n        stroke-dashoffset: 0;\n    }\n    50% {\n        stroke-dasharray: 89,200;\n        stroke-dashoffset: -35px;\n    }\n    100% {\n        stroke-dasharray: 89,200;\n        stroke-dashoffset: -124px;\n    }\n}\n@keyframes color {\n    100%, 0% {\n        stroke: #d62d20;\n    }\n    40% {\n        stroke: #0057e7;\n    }\n    66% {\n        stroke: #008744;\n    }\n    80%, 90% {\n        stroke: #ffa700;\n    }\n}';

var Loading = function (_React$Component) {
    _inherits(Loading, _React$Component);

    function Loading() {
        _classCallCheck(this, Loading);

        return _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).apply(this, arguments));
    }

    _createClass(Loading, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                component = _props.component,
                className = _props.className,
                isLoading = _props.isLoading,
                children = _props.children;


            if (isLoading) {
                var _props2 = this.props,
                    width = _props2.width,
                    height = _props2.height,
                    margin = _props2.margin,
                    style = _props2.style,
                    strokeWidth = _props2.strokeWidth;


                loading_style.width = width;
                loading_style.height = height;
                loading_style.margin = margin;

                return React.createElement(component, { style: Object.assign({}, loading_style, style) }, React.createElement(
                    'style',
                    null,
                    animation
                ), React.createElement(
                    'svg',
                    { style: svg_style, viewBox: '25 25 50 50' },
                    React.createElement('circle', { style: circle_style, cx: '50', cy: '50', r: '20', fill: 'none', strokeWidth: strokeWidth, strokeMiterlimit: '10' })
                ));
            } else {
                return React.createElement(component, { className: className }, children || null);
            }
        }
    }]);

    return Loading;
}(React.Component);

Loading.propTypes = {
    className: PropTypes.string,
    isLoading: PropTypes.bool,
    style: PropTypes.object,
    width: PropTypes.string,
    height: PropTypes.string,
    margin: PropTypes.string,
    component: PropTypes.any
};

Loading.defaultProps = {
    className: '',
    isLoading: true,
    style: {},
    width: '40px',
    height: '40px',
    margin: '0 auto',
    component: 'div',
    strokeWidth: '7'
};

module.exports = Loading;

// Polyfills
if (typeof Object.assign !== 'function') {
    Object.assign = function (target, varArgs) {
        // .length of function is 2

        if (target == null) {
            // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];

            if (nextSource != null) {
                // Skip over if undefined or null
                for (var nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    };
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ViaCep = function (_React$Component) {
  _inherits(ViaCep, _React$Component);

  function ViaCep(props) {
    _classCallCheck(this, ViaCep);

    var _this = _possibleConstructorReturn(this, (ViaCep.__proto__ || Object.getPrototypeOf(ViaCep)).call(this, props));

    _this.state = {
      data: null,
      loading: false,
      error: false
    };
    _this.getCep = _this.getCep.bind(_this);
    return _this;
  }

  _createClass(ViaCep, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.lazy) {
        return;
      }
      this.getCep();
    }
  }, {
    key: "getCep",
    value: function getCep() {
      var _this2 = this;

      this.setState({ loading: true });
      fetch("https://viacep.com.br/ws/" + this.props.cep + "/json/").then(function (response) {
        return response.json();
      }).then(function (data) {
        _this2.setState({ data: data, loading: false });
        _this2.props.onSuccess(data);
      }).catch(function (err) {
        _this2.setState({ error: true, loading: false });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children({
        loading: this.state.loading,
        data: this.state.data,
        error: this.state.error,
        fetch: this.getCep
      }) || null;
    }
  }]);

  return ViaCep;
}(_react2.default.Component);

ViaCep.propTypes = {
  cep: _propTypes2.default.string.isRequired,
  lazy: _propTypes2.default.bool,
  onSuccess: _propTypes2.default.func
};

exports.default = ViaCep;
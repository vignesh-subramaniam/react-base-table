"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var TableFooter =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2["default"])(TableFooter, _React$PureComponent);

  function TableFooter(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, TableFooter);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(TableFooter).call(this, props));
    _this.renderFooterRow = _this.renderFooterRow.bind((0, _assertThisInitialized2["default"])(_this));
    _this.renderFrozenRow = _this.renderFrozenRow.bind((0, _assertThisInitialized2["default"])(_this));
    _this._setRef = _this._setRef.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(TableFooter, [{
    key: "scrollTo",
    value: function scrollTo(offset) {
      if (this.footerRef) this.footerRef.scrollLeft = offset;
    }
  }, {
    key: "renderFooterRow",
    value: function renderFooterRow(height, index) {
      var _this$props = this.props,
          columns = _this$props.columns,
          footerRenderer = _this$props.footerRenderer;
      if (height <= 0) return null;
      var style = {
        width: '100%',
        height: height
      };
      return footerRenderer({
        style: style,
        columns: columns,
        footerIndex: index
      });
    }
  }, {
    key: "renderFrozenRow",
    value: function renderFrozenRow(rowData, index) {
      var _this$props2 = this.props,
          columns = _this$props2.columns,
          rowHeight = _this$props2.rowHeight,
          rowRenderer = _this$props2.rowRenderer;
      var style = {
        width: '100%',
        height: rowHeight
      }; // for frozen row the `rowIndex` is negative

      var rowIndex = -index - 1;
      return rowRenderer({
        style: style,
        columns: columns,
        rowData: rowData,
        rowIndex: rowIndex
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          className = _this$props3.className,
          width = _this$props3.width,
          height = _this$props3.height,
          rowWidth = _this$props3.rowWidth,
          footerHeight = _this$props3.footerHeight,
          frozenData = _this$props3.frozenData;
      if (height <= 0) return null;
      var style = {
        width: width,
        height: height,
        position: 'relative',
        overflow: 'hidden'
      };
      var innerStyle = {
        width: rowWidth,
        height: height
      };
      var rowHeights = Array.isArray(footerHeight) ? footerHeight : [footerHeight];
      return _react["default"].createElement("div", {
        role: "grid",
        ref: this._setRef,
        className: className,
        style: style
      }, _react["default"].createElement("div", {
        role: "rowgroup",
        style: innerStyle
      }, rowHeights.map(this.renderFooterRow), frozenData.map(this.renderFrozenRow)));
    }
  }, {
    key: "_setRef",
    value: function _setRef(ref) {
      this.footerRef = ref;
    }
  }]);
  return TableFooter;
}(_react["default"].PureComponent);

TableFooter.propTypes = {
  className: _propTypes["default"].string,
  width: _propTypes["default"].number.isRequired,
  height: _propTypes["default"].number.isRequired,
  footerHeight: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].arrayOf(_propTypes["default"].number)]).isRequired,
  rowWidth: _propTypes["default"].number.isRequired,
  rowHeight: _propTypes["default"].number.isRequired,
  columns: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
  data: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
  frozenData: _propTypes["default"].arrayOf(_propTypes["default"].object),
  footerRenderer: _propTypes["default"].func.isRequired,
  rowRenderer: _propTypes["default"].func.isRequired
};
var _default = TableFooter;
exports["default"] = _default;
//# sourceMappingURL=TableFooter.js.map
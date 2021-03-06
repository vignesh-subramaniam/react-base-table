"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _GridTable = _interopRequireDefault(require("./GridTable"));

var _TableHeaderRow = _interopRequireDefault(require("./TableHeaderRow"));

var _TableFooterRow = _interopRequireDefault(require("./TableFooterRow"));

var _TableRow = _interopRequireDefault(require("./TableRow"));

var _TableHeaderCell = _interopRequireDefault(require("./TableHeaderCell"));

var _TableFooterCell = _interopRequireDefault(require("./TableFooterCell"));

var _TableCell = _interopRequireDefault(require("./TableCell"));

var _Column = _interopRequireWildcard(require("./Column"));

var _SortOrder = _interopRequireDefault(require("./SortOrder"));

var _ExpandIcon = _interopRequireDefault(require("./ExpandIcon"));

var _SortIndicator = _interopRequireDefault(require("./SortIndicator"));

var _ColumnResizer = _interopRequireDefault(require("./ColumnResizer"));

var _ColumnManager = _interopRequireDefault(require("./ColumnManager"));

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var getColumns = (0, _memoizeOne["default"])(function (columns, children) {
  return columns || (0, _utils.normalizeColumns)(children);
});

var getContainerStyle = function getContainerStyle(width, maxWidth, height) {
  return {
    width: width,
    maxWidth: maxWidth,
    height: height,
    overflow: 'hidden'
  };
};

var DEFAULT_COMPONENTS = {
  TableCell: _TableCell["default"],
  TableHeaderCell: _TableHeaderCell["default"],
  TableFooterCell: _TableFooterCell["default"],
  ExpandIcon: _ExpandIcon["default"],
  SortIndicator: _SortIndicator["default"]
};
var RESIZE_THROTTLE_WAIT = 50; // used for memoization

var EMPTY_ARRAY = [];
/**
 * React table component
 */

var BaseTable =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2["default"])(BaseTable, _React$PureComponent);

  function BaseTable(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, BaseTable);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(BaseTable).call(this, props));
    var columns = props.columns,
        children = props.children,
        defaultExpandedRowKeys = props.defaultExpandedRowKeys;
    _this.state = {
      scrollbarSize: 0,
      hoveredRowKey: null,
      clickedRowKey: null,
      resizingKey: null,
      resizingWidth: 0,
      expandedRowKeys: (0, _utils.cloneArray)(defaultExpandedRowKeys)
    };
    _this.columnManager = new _ColumnManager["default"](getColumns(columns, children), props.fixed);
    _this._setContainerRef = _this._setContainerRef.bind((0, _assertThisInitialized2["default"])(_this));
    _this._setMainTableRef = _this._setMainTableRef.bind((0, _assertThisInitialized2["default"])(_this));
    _this._setLeftTableRef = _this._setLeftTableRef.bind((0, _assertThisInitialized2["default"])(_this));
    _this._setRightTableRef = _this._setRightTableRef.bind((0, _assertThisInitialized2["default"])(_this));
    _this.renderExpandIcon = _this.renderExpandIcon.bind((0, _assertThisInitialized2["default"])(_this));
    _this.renderRow = _this.renderRow.bind((0, _assertThisInitialized2["default"])(_this));
    _this.renderRowCell = _this.renderRowCell.bind((0, _assertThisInitialized2["default"])(_this));
    _this.renderHeader = _this.renderHeader.bind((0, _assertThisInitialized2["default"])(_this));
    _this.renderFooter = _this.renderFooter.bind((0, _assertThisInitialized2["default"])(_this));
    _this.renderHeaderCell = _this.renderHeaderCell.bind((0, _assertThisInitialized2["default"])(_this));
    _this.renderFooterCell = _this.renderFooterCell.bind((0, _assertThisInitialized2["default"])(_this));
    _this._handleScroll = _this._handleScroll.bind((0, _assertThisInitialized2["default"])(_this));
    _this._handleVerticalScroll = _this._handleVerticalScroll.bind((0, _assertThisInitialized2["default"])(_this));
    _this._handleRowsRendered = _this._handleRowsRendered.bind((0, _assertThisInitialized2["default"])(_this));
    _this._handleRowHover = _this._handleRowHover.bind((0, _assertThisInitialized2["default"])(_this));
    _this._handleRowClick = _this._handleRowClick.bind((0, _assertThisInitialized2["default"])(_this));
    _this._handleRowExpand = _this._handleRowExpand.bind((0, _assertThisInitialized2["default"])(_this));
    _this._handleColumnResize = (0, _utils.throttle)(_this._handleColumnResize.bind((0, _assertThisInitialized2["default"])(_this)), RESIZE_THROTTLE_WAIT);
    _this._handleColumnResizeStart = _this._handleColumnResizeStart.bind((0, _assertThisInitialized2["default"])(_this));
    _this._handleColumnResizeStop = _this._handleColumnResizeStop.bind((0, _assertThisInitialized2["default"])(_this));
    _this._handleColumnSort = _this._handleColumnSort.bind((0, _assertThisInitialized2["default"])(_this));
    _this._getLeftTableContainerStyle = (0, _memoizeOne["default"])(getContainerStyle);
    _this._getRightTableContainerStyle = (0, _memoizeOne["default"])(getContainerStyle);
    _this._flattenOnKeys = (0, _memoizeOne["default"])(function (tree, keys, dataKey) {
      _this._depthMap = {};
      return (0, _utils.flattenOnKeys)(tree, keys, _this._depthMap, dataKey);
    });
    _this._resetColumnManager = (0, _memoizeOne["default"])(function (columns, fixed) {
      _this.columnManager.reset(columns, fixed);
    }, _utils.isObjectEqual);
    _this._scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    _this._scrollHeight = 0;
    _this._lastScannedRowIndex = -1;
    _this._hasDataChangedSinceEndReached = true;
    _this._data = props.data;
    _this._depthMap = {};
    _this._horizontalScrollbarSize = 0;
    _this._verticalScrollbarSize = 0;
    _this._scrollbarPresenceChanged = false;
    return _this;
  }
  /**
   * Get the DOM node of the table
   */


  (0, _createClass2["default"])(BaseTable, [{
    key: "getDOMNode",
    value: function getDOMNode() {
      return this.tableNode;
    }
    /**
     * Get the column manager
     */

  }, {
    key: "getColumnManager",
    value: function getColumnManager() {
      return this.columnManager;
    }
    /**
     * Get internal `expandedRowKeys` state
     */

  }, {
    key: "getExpandedRowKeys",
    value: function getExpandedRowKeys() {
      var expandedRowKeys = this.props.expandedRowKeys;
      return expandedRowKeys !== undefined ? expandedRowKeys || EMPTY_ARRAY : this.state.expandedRowKeys;
    }
    /**
     * Get the expanded state, fallback to normal state if not expandable.
     */

  }, {
    key: "getExpandedState",
    value: function getExpandedState() {
      return {
        expandedData: this._data,
        expandedRowKeys: this.getExpandedRowKeys(),
        expandedDepthMap: this._depthMap
      };
    }
    /**
     * Get the total height of all rows, including expanded rows.
     */

  }, {
    key: "getTotalRowsHeight",
    value: function getTotalRowsHeight() {
      return this._data.length * this.props.rowHeight;
    }
    /**
     * Get the total width of all columns.
     */

  }, {
    key: "getTotalColumnsWidth",
    value: function getTotalColumnsWidth() {
      return this.columnManager.getColumnsWidth();
    }
    /**
     * Forcefully re-render the inner Grid component.
     *
     * Calling `forceUpdate` on `Table` may not re-render the inner Grid since it uses `shallowCompare` as a performance optimization.
     * Use this method if you want to manually trigger a re-render.
     * This may be appropriate if the underlying row data has changed but the row sizes themselves have not.
     */

  }, {
    key: "forceUpdateTable",
    value: function forceUpdateTable() {
      this.table && this.table.forceUpdateTable();
      this.leftTable && this.leftTable.forceUpdateTable();
      this.rightTable && this.rightTable.forceUpdateTable();
    }
    /**
     * Scroll to the specified offset.
     * Useful for animating position changes.
     *
     * @param {object} offset
     */

  }, {
    key: "scrollToPosition",
    value: function scrollToPosition(offset) {
      this._scroll = offset;
      this.table && this.table.scrollToPosition(offset);
      this.leftTable && this.leftTable.scrollToTop(offset.scrollTop);
      this.rightTable && this.rightTable.scrollToTop(offset.scrollTop);
    }
    /**
     * Scroll to the specified offset vertically.
     *
     * @param {number} scrollTop
     */

  }, {
    key: "scrollToTop",
    value: function scrollToTop(scrollTop) {
      this._scroll.scrollTop = scrollTop;
      this.table && this.table.scrollToPosition(this._scroll);
      this.leftTable && this.leftTable.scrollToTop(scrollTop);
      this.rightTable && this.rightTable.scrollToTop(scrollTop);
    }
    /**
     * Scroll to the specified offset horizontally.
     *
     * @param {number} scrollLeft
     */

  }, {
    key: "scrollToLeft",
    value: function scrollToLeft(scrollLeft) {
      this._scroll.scrollLeft = scrollLeft;
      this.table && this.table.scrollToPosition(this._scroll);
    }
    /**
     * Scroll to the specified row.
     * By default, the table will scroll as little as possible to ensure the row is visible.
     * You can control the alignment of the row though by specifying an align property. Acceptable values are:
     *
     * - `auto` (default) - Scroll as little as possible to ensure the row is visible.
     * - `smart` - Same as `auto` if it is less than one viewport away, or it's the same as`center`.
     * - `center` - Center align the row within the table.
     * - `end` - Align the row to the bottom side of the table.
     * - `start` - Align the row to the top side of the table.
      * @param {number} rowIndex
     * @param {string} align
     */

  }, {
    key: "scrollToRow",
    value: function scrollToRow() {
      var rowIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var align = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'auto';
      this.table && this.table.scrollToRow(rowIndex, align);
      this.leftTable && this.leftTable.scrollToRow(rowIndex, align);
      this.rightTable && this.rightTable.scrollToRow(rowIndex, align);
    }
    /**
     * Set `expandedRowKeys` manually.
     * This method is available only if `expandedRowKeys` is uncontrolled.
     *
     * @param {array} expandedRowKeys
     */

  }, {
    key: "setExpandedRowKeys",
    value: function setExpandedRowKeys(expandedRowKeys) {
      // if `expandedRowKeys` is controlled
      if (this.props.expandedRowKeys !== undefined) return;
      this.setState({
        expandedRowKeys: (0, _utils.cloneArray)(expandedRowKeys)
      });
    }
  }, {
    key: "renderExpandIcon",
    value: function renderExpandIcon(_ref) {
      var rowData = _ref.rowData,
          rowIndex = _ref.rowIndex,
          depth = _ref.depth,
          onExpand = _ref.onExpand;
      var _this$props = this.props,
          rowKey = _this$props.rowKey,
          expandColumnKey = _this$props.expandColumnKey,
          expandIconProps = _this$props.expandIconProps;
      if (!expandColumnKey) return null;
      var expandable = rowIndex >= 0 && (0, _utils.hasChildren)(rowData);
      var expanded = rowIndex >= 0 && this.getExpandedRowKeys().indexOf(rowData[rowKey]) >= 0;
      var extraProps = (0, _utils.callOrReturn)(expandIconProps, {
        rowData: rowData,
        rowIndex: rowIndex,
        depth: depth,
        expandable: expandable,
        expanded: expanded
      });

      var ExpandIcon = this._getComponent('ExpandIcon');

      return _react["default"].createElement(ExpandIcon, (0, _extends2["default"])({
        depth: depth,
        expandable: expandable,
        expanded: expanded
      }, extraProps, {
        onExpand: onExpand
      }));
    }
  }, {
    key: "renderRow",
    value: function renderRow(_ref2) {
      var _cn;

      var isScrolling = _ref2.isScrolling,
          columns = _ref2.columns,
          rowData = _ref2.rowData,
          rowIndex = _ref2.rowIndex,
          style = _ref2.style;
      var _this$props2 = this.props,
          rowClassName = _this$props2.rowClassName,
          rowRenderer = _this$props2.rowRenderer,
          rowEventHandlers = _this$props2.rowEventHandlers,
          expandColumnKey = _this$props2.expandColumnKey;
      var rowClass = (0, _utils.callOrReturn)(rowClassName, {
        columns: columns,
        rowData: rowData,
        rowIndex: rowIndex
      });
      var extraProps = (0, _utils.callOrReturn)(this.props.rowProps, {
        columns: columns,
        rowData: rowData,
        rowIndex: rowIndex
      });
      var rowKey = rowData[this.props.rowKey];
      var depth = this._depthMap[rowKey] || 0;
      var className = (0, _classnames["default"])(this._prefixClass('row'), rowClass, (_cn = {}, (0, _defineProperty2["default"])(_cn, this._prefixClass("row--depth-".concat(depth)), !!expandColumnKey && rowIndex >= 0), (0, _defineProperty2["default"])(_cn, this._prefixClass('row--expanded'), !!expandColumnKey && this.getExpandedRowKeys().indexOf(rowKey) >= 0), (0, _defineProperty2["default"])(_cn, this._prefixClass('row--hovered'), !isScrolling && rowKey === this.state.hoveredRowKey), (0, _defineProperty2["default"])(_cn, this._prefixClass('row--clicked'), rowKey === this.state.clickedRowKey), (0, _defineProperty2["default"])(_cn, this._prefixClass('row--frozen'), depth === 0 && rowIndex < 0), (0, _defineProperty2["default"])(_cn, this._prefixClass('row--customized'), rowRenderer), _cn));

      var rowProps = _objectSpread({}, extraProps, {
        role: 'row',
        key: "row-".concat(rowKey),
        isScrolling: isScrolling,
        className: className,
        style: style,
        columns: columns,
        rowIndex: rowIndex,
        rowData: rowData,
        rowKey: rowKey,
        expandColumnKey: expandColumnKey,
        depth: depth,
        rowEventHandlers: rowEventHandlers,
        rowRenderer: rowRenderer,
        cellRenderer: this.renderRowCell,
        expandIconRenderer: this.renderExpandIcon,
        onRowExpand: this._handleRowExpand,
        // for fixed table, we need to sync the hover state across the inner tables
        onRowHover: this.columnManager.hasFrozenColumns() ? this._handleRowHover : null,
        onRowClick: this.columnManager.hasFrozenColumns() ? this._handleRowClick : null
      });

      return _react["default"].createElement(_TableRow["default"], rowProps);
    }
  }, {
    key: "renderRowCell",
    value: function renderRowCell(_ref3) {
      var _cn2;

      var isScrolling = _ref3.isScrolling,
          columns = _ref3.columns,
          column = _ref3.column,
          columnIndex = _ref3.columnIndex,
          rowData = _ref3.rowData,
          rowIndex = _ref3.rowIndex,
          expandIcon = _ref3.expandIcon;

      if (column[_ColumnManager["default"].PlaceholderKey]) {
        return _react["default"].createElement("div", {
          key: "row-".concat(rowData[this.props.rowKey], "-cell-").concat(column.key, "-placeholder"),
          className: this._prefixClass('row-cell-placeholder'),
          style: this.columnManager.getColumnStyle(column.key)
        });
      }

      var className = column.className,
          dataKey = column.dataKey,
          dataGetter = column.dataGetter,
          cellRenderer = column.cellRenderer;

      var TableCell = this._getComponent('TableCell');

      var cellData = dataGetter ? dataGetter({
        columns: columns,
        column: column,
        columnIndex: columnIndex,
        rowData: rowData,
        rowIndex: rowIndex
      }) : (0, _utils.getValue)(rowData, dataKey);
      var cellProps = {
        isScrolling: isScrolling,
        cellData: cellData,
        columns: columns,
        column: column,
        columnIndex: columnIndex,
        rowData: rowData,
        rowIndex: rowIndex,
        container: this
      };
      var cell = (0, _utils.renderElement)(cellRenderer || _react["default"].createElement(TableCell, {
        className: this._prefixClass('row-cell-text')
      }), cellProps);
      var cellCls = (0, _utils.callOrReturn)(className, {
        cellData: cellData,
        columns: columns,
        column: column,
        columnIndex: columnIndex,
        rowData: rowData,
        rowIndex: rowIndex
      });
      var cls = (0, _classnames["default"])(this._prefixClass('row-cell'), cellCls, (_cn2 = {}, (0, _defineProperty2["default"])(_cn2, this._prefixClass('row-cell--align-center'), column.align === _Column.Alignment.CENTER), (0, _defineProperty2["default"])(_cn2, this._prefixClass('row-cell--align-right'), column.align === _Column.Alignment.RIGHT), _cn2));
      var extraProps = (0, _utils.callOrReturn)(this.props.cellProps, {
        columns: columns,
        column: column,
        columnIndex: columnIndex,
        rowData: rowData,
        rowIndex: rowIndex
      });

      var _ref4 = extraProps || {},
          tagName = _ref4.tagName,
          rest = (0, _objectWithoutProperties2["default"])(_ref4, ["tagName"]);

      var Tag = tagName || 'div';
      return _react["default"].createElement(Tag, (0, _extends2["default"])({
        role: "gridcell",
        key: "row-".concat(rowData[this.props.rowKey], "-cell-").concat(column.key)
      }, rest, {
        className: cls,
        style: this.columnManager.getColumnStyle(column.key)
      }), expandIcon, cell);
    }
  }, {
    key: "renderHeader",
    value: function renderHeader(_ref5) {
      var _cn3;

      var columns = _ref5.columns,
          headerIndex = _ref5.headerIndex,
          style = _ref5.style;
      var _this$props3 = this.props,
          headerClassName = _this$props3.headerClassName,
          headerRenderer = _this$props3.headerRenderer;
      var headerClass = (0, _utils.callOrReturn)(headerClassName, {
        columns: columns,
        headerIndex: headerIndex
      });
      var extraProps = (0, _utils.callOrReturn)(this.props.headerProps, {
        columns: columns,
        headerIndex: headerIndex
      });
      var className = (0, _classnames["default"])(this._prefixClass('header-row'), headerClass, (_cn3 = {}, (0, _defineProperty2["default"])(_cn3, this._prefixClass('header-row--resizing'), !!this.state.resizingKey), (0, _defineProperty2["default"])(_cn3, this._prefixClass('header-row--customized'), headerRenderer), _cn3));

      var headerProps = _objectSpread({}, extraProps, {
        role: 'row',
        key: "header-".concat(headerIndex),
        className: className,
        style: style,
        columns: columns,
        headerIndex: headerIndex,
        headerRenderer: headerRenderer,
        cellRenderer: this.renderHeaderCell,
        expandColumnKey: this.props.expandColumnKey,
        expandIcon: this._getComponent('ExpandIcon')
      });

      return _react["default"].createElement(_TableHeaderRow["default"], headerProps);
    }
  }, {
    key: "renderFooter",
    value: function renderFooter(_ref6) {
      var _cn4;

      var columns = _ref6.columns,
          footerIndex = _ref6.footerIndex,
          style = _ref6.style;
      var _this$props4 = this.props,
          footerClassName = _this$props4.footerClassName,
          footerRenderer = _this$props4.footerRenderer;
      var footerClass = (0, _utils.callOrReturn)(footerClassName, {
        columns: columns,
        footerIndex: footerIndex
      });
      var extraProps = (0, _utils.callOrReturn)(this.props.footerProps, {
        columns: columns,
        footerIndex: footerIndex
      });
      var className = (0, _classnames["default"])(this._prefixClass('footer-row'), footerClass, (_cn4 = {}, (0, _defineProperty2["default"])(_cn4, this._prefixClass('footer-row--resizing'), !!this.state.resizingKey), (0, _defineProperty2["default"])(_cn4, this._prefixClass('footer-row--customized'), footerRenderer), _cn4));

      var footerProps = _objectSpread({}, extraProps, {
        role: 'row',
        key: "footer-".concat(footerIndex),
        className: className,
        style: style,
        columns: columns,
        footerIndex: footerIndex,
        footerRenderer: footerRenderer,
        cellRenderer: this.renderFooterCell,
        expandColumnKey: this.props.expandColumnKey
      });

      return _react["default"].createElement(_TableFooterRow["default"], footerProps);
    }
  }, {
    key: "renderHeaderCell",
    value: function renderHeaderCell(_ref7) {
      var _cn5;

      var columns = _ref7.columns,
          column = _ref7.column,
          columnIndex = _ref7.columnIndex,
          headerIndex = _ref7.headerIndex,
          expandIcon = _ref7.expandIcon;

      if (column[_ColumnManager["default"].PlaceholderKey]) {
        return _react["default"].createElement("div", {
          key: "header-".concat(headerIndex, "-cell-").concat(column.key, "-placeholder"),
          className: this._prefixClass('header-cell-placeholder'),
          style: this.columnManager.getColumnStyle(column.key)
        });
      }

      var headerClassName = column.headerClassName,
          headerRenderer = column.headerRenderer;
      var _this$props5 = this.props,
          sortBy = _this$props5.sortBy,
          sortState = _this$props5.sortState,
          headerCellProps = _this$props5.headerCellProps;

      var TableHeaderCell = this._getComponent('TableHeaderCell');

      var SortIndicator = this._getComponent('SortIndicator');

      var cellProps = {
        columns: columns,
        column: column,
        columnIndex: columnIndex,
        headerIndex: headerIndex,
        container: this
      };
      var cell = (0, _utils.renderElement)(headerRenderer || _react["default"].createElement(TableHeaderCell, {
        className: this._prefixClass('header-cell-text')
      }), cellProps);
      var sorting, sortOrder;

      if (sortState) {
        var order = sortState[column.key];
        sorting = order === _SortOrder["default"].ASC || order === _SortOrder["default"].DESC;
        sortOrder = sorting ? order : _SortOrder["default"].ASC;
      } else {
        sorting = column.key === sortBy.key;
        sortOrder = sorting ? sortBy.order : _SortOrder["default"].ASC;
      }

      var cellCls = (0, _utils.callOrReturn)(headerClassName, {
        columns: columns,
        column: column,
        columnIndex: columnIndex,
        headerIndex: headerIndex
      });
      var cls = (0, _classnames["default"])(this._prefixClass('header-cell'), cellCls, (_cn5 = {}, (0, _defineProperty2["default"])(_cn5, this._prefixClass('header-cell--align-center'), column.align === _Column.Alignment.CENTER), (0, _defineProperty2["default"])(_cn5, this._prefixClass('header-cell--align-right'), column.align === _Column.Alignment.RIGHT), (0, _defineProperty2["default"])(_cn5, this._prefixClass('header-cell--sortable'), column.sortable), (0, _defineProperty2["default"])(_cn5, this._prefixClass('header-cell--sorting'), sorting), (0, _defineProperty2["default"])(_cn5, this._prefixClass('header-cell--resizing'), column.key === this.state.resizingKey), _cn5));
      var extraProps = (0, _utils.callOrReturn)(headerCellProps, {
        columns: columns,
        column: column,
        columnIndex: columnIndex,
        headerIndex: headerIndex
      });

      var _ref8 = extraProps || {},
          tagName = _ref8.tagName,
          rest = (0, _objectWithoutProperties2["default"])(_ref8, ["tagName"]);

      var Tag = tagName || 'div';
      return _react["default"].createElement(Tag, (0, _extends2["default"])({
        role: "gridcell",
        key: "header-".concat(headerIndex, "-cell-").concat(column.key),
        onClick: column.sortable ? this._handleColumnSort : null
      }, rest, {
        className: cls,
        style: this.columnManager.getColumnStyle(column.key),
        "data-key": column.key
      }), expandIcon, cell, column.sortable && _react["default"].createElement(SortIndicator, {
        sortOrder: sortOrder,
        className: (0, _classnames["default"])(this._prefixClass('sort-indicator'), (0, _defineProperty2["default"])({}, this._prefixClass('sort-indicator--descending'), sortOrder === _SortOrder["default"].DESC))
      }), column.resizable && _react["default"].createElement(_ColumnResizer["default"], {
        className: this._prefixClass('column-resizer'),
        column: column,
        onResizeStart: this._handleColumnResizeStart,
        onResizeStop: this._handleColumnResizeStop,
        onResize: this._handleColumnResize
      }));
    }
  }, {
    key: "renderFooterCell",
    value: function renderFooterCell(_ref9) {
      var _cn7;

      var columns = _ref9.columns,
          column = _ref9.column,
          columnIndex = _ref9.columnIndex,
          footerIndex = _ref9.footerIndex;

      if (column[_ColumnManager["default"].PlaceholderKey]) {
        return _react["default"].createElement("div", {
          key: "footer-".concat(footerIndex, "-cell-").concat(column.key, "-placeholder"),
          className: this._prefixClass('footer-cell-placeholder'),
          style: this.columnManager.getColumnStyle(column.key)
        });
      }

      var footerClassName = column.footerClassName,
          footerRenderer = column.footerRenderer;
      var footerCellProps = this.props.footerCellProps;

      var TableFooterCell = this._getComponent('TableFooterCell');

      var cellProps = {
        columns: columns,
        column: column,
        columnIndex: columnIndex,
        footerIndex: footerIndex,
        container: this
      };
      var cell = (0, _utils.renderElement)(footerRenderer || _react["default"].createElement(TableFooterCell, {
        className: this._prefixClass('footer-cell-text')
      }), cellProps);
      var cellCls = (0, _utils.callOrReturn)(footerClassName, {
        columns: columns,
        column: column,
        columnIndex: columnIndex,
        footerIndex: footerIndex
      });
      var cls = (0, _classnames["default"])(this._prefixClass('footer-cell'), cellCls, (_cn7 = {}, (0, _defineProperty2["default"])(_cn7, this._prefixClass('footer-cell--align-center'), column.align === _Column.Alignment.CENTER), (0, _defineProperty2["default"])(_cn7, this._prefixClass('footer-cell--align-right'), column.align === _Column.Alignment.RIGHT), (0, _defineProperty2["default"])(_cn7, this._prefixClass('footer-cell--sortable'), column.sortable), (0, _defineProperty2["default"])(_cn7, this._prefixClass('footer-cell--resizing'), column.key === this.state.resizingKey), _cn7));
      var extraProps = (0, _utils.callOrReturn)(footerCellProps, {
        columns: columns,
        column: column,
        columnIndex: columnIndex,
        footerIndex: footerIndex
      });

      var _ref10 = extraProps || {},
          tagName = _ref10.tagName,
          rest = (0, _objectWithoutProperties2["default"])(_ref10, ["tagName"]);

      var Tag = tagName || 'div';
      return _react["default"].createElement(Tag, (0, _extends2["default"])({
        role: "gridcell",
        key: "footer-".concat(footerIndex, "-cell-").concat(column.key)
      }, rest, {
        className: cls,
        style: this.columnManager.getColumnStyle(column.key),
        "data-key": column.key
      }), cell);
    }
  }, {
    key: "renderMainTable",
    value: function renderMainTable() {
      var _this$props6 = this.props,
          width = _this$props6.width,
          headerHeight = _this$props6.headerHeight,
          rowHeight = _this$props6.rowHeight,
          fixed = _this$props6.fixed,
          rest = (0, _objectWithoutProperties2["default"])(_this$props6, ["width", "headerHeight", "rowHeight", "fixed"]);

      var height = this._getTableHeight();

      var tableWidth = width - this._verticalScrollbarSize;

      if (fixed) {
        var columnsWidth = this.columnManager.getColumnsWidth(); // make sure `scrollLeft` is always integer to fix a sync bug when scrolling to end horizontally

        tableWidth = Math.max(Math.round(columnsWidth), tableWidth);
      }

      return _react["default"].createElement(_GridTable["default"], (0, _extends2["default"])({}, rest, this.state, {
        className: this._prefixClass('table-main'),
        ref: this._setMainTableRef,
        data: this._data,
        columns: this.columnManager.getMainColumns(),
        width: width,
        height: height,
        headerHeight: headerHeight,
        rowHeight: rowHeight,
        headerWidth: tableWidth + (fixed ? this._verticalScrollbarSize : 0),
        bodyWidth: tableWidth,
        headerRenderer: this.renderHeader,
        footerRenderer: this.renderFooter,
        rowRenderer: this.renderRow,
        onScroll: this._handleScroll,
        onRowsRendered: this._handleRowsRendered
      }));
    }
  }, {
    key: "renderLeftTable",
    value: function renderLeftTable() {
      if (!this.columnManager.hasLeftFrozenColumns()) return null;
      var _this$props7 = this.props,
          width = _this$props7.width,
          headerHeight = _this$props7.headerHeight,
          rowHeight = _this$props7.rowHeight,
          rest = (0, _objectWithoutProperties2["default"])(_this$props7, ["width", "headerHeight", "rowHeight"]);

      var containerHeight = this._getFrozenContainerHeight();

      var offset = this._verticalScrollbarSize || 20;
      var columnsWidth = this.columnManager.getLeftFrozenColumnsWidth();
      return _react["default"].createElement(_GridTable["default"], (0, _extends2["default"])({}, rest, this.state, {
        containerStyle: this._getLeftTableContainerStyle(columnsWidth, width, containerHeight),
        className: this._prefixClass('table-frozen-left'),
        ref: this._setLeftTableRef,
        data: this._data,
        columns: this.columnManager.getLeftFrozenColumns(),
        width: columnsWidth + offset,
        height: containerHeight,
        headerHeight: headerHeight,
        rowHeight: rowHeight,
        headerWidth: columnsWidth + offset,
        bodyWidth: columnsWidth + offset,
        headerRenderer: this.renderHeader,
        footerRenderer: this.renderFooter,
        rowRenderer: this.renderRow,
        onScroll: this._handleVerticalScroll,
        onRowsRendered: _utils.noop
      }));
    }
  }, {
    key: "renderRightTable",
    value: function renderRightTable() {
      if (!this.columnManager.hasRightFrozenColumns()) return null;
      var _this$props8 = this.props,
          width = _this$props8.width,
          headerHeight = _this$props8.headerHeight,
          rowHeight = _this$props8.rowHeight,
          rest = (0, _objectWithoutProperties2["default"])(_this$props8, ["width", "headerHeight", "rowHeight"]);

      var containerHeight = this._getFrozenContainerHeight();

      var columnsWidth = this.columnManager.getRightFrozenColumnsWidth();
      var scrollbarWidth = this._verticalScrollbarSize;
      return _react["default"].createElement(_GridTable["default"], (0, _extends2["default"])({}, rest, this.state, {
        containerStyle: this._getLeftTableContainerStyle(columnsWidth + scrollbarWidth, width, containerHeight),
        className: this._prefixClass('table-frozen-right'),
        ref: this._setRightTableRef,
        data: this._data,
        columns: this.columnManager.getRightFrozenColumns(),
        width: columnsWidth + scrollbarWidth,
        height: containerHeight,
        headerHeight: headerHeight,
        rowHeight: rowHeight,
        headerWidth: columnsWidth + scrollbarWidth,
        bodyWidth: columnsWidth,
        headerRenderer: this.renderHeader,
        footerRenderer: this.renderFooter,
        rowRenderer: this.renderRow,
        onScroll: this._handleVerticalScroll,
        onRowsRendered: _utils.noop
      }));
    }
  }, {
    key: "renderResizingLine",
    value: function renderResizingLine() {
      var _this$props9 = this.props,
          width = _this$props9.width,
          fixed = _this$props9.fixed;
      var resizingKey = this.state.resizingKey;
      if (!fixed || !resizingKey) return null;
      var columns = this.columnManager.getMainColumns();
      var idx = columns.findIndex(function (column) {
        return column.key === resizingKey;
      });
      var column = columns[idx];
      var columnWidth = column.width,
          frozen = column.frozen;
      var leftWidth = this.columnManager.recomputeColumnsWidth(columns.slice(0, idx));
      var left = leftWidth + columnWidth;

      if (!frozen) {
        left -= this._scroll.scrollLeft;
      } else if (frozen === _Column.FrozenDirection.RIGHT) {
        var rightWidth = this.columnManager.recomputeColumnsWidth(columns.slice(idx + 1));

        if (rightWidth + columnWidth > width - this._verticalScrollbarSize) {
          left = columnWidth;
        } else {
          left = width - this._verticalScrollbarSize - rightWidth;
        }
      }

      var style = {
        left: left,
        height: this._getTableHeight() - this._horizontalScrollbarSize
      };
      return _react["default"].createElement("div", {
        className: this._prefixClass('resizing-line'),
        style: style
      });
    } // renderFooter() {
    //   const { footerHeight, footerRenderer } = this.props;
    //   if (footerHeight === 0) return null;
    //   return (
    //     <div className={this._prefixClass('footer')} style={{ height: footerHeight }}>
    //       {renderElement(footerRenderer)}
    //     </div>
    //   );
    // }

  }, {
    key: "renderEmptyLayer",
    value: function renderEmptyLayer() {
      var _this$props10 = this.props,
          data = _this$props10.data,
          footerHeight = _this$props10.footerHeight,
          emptyRenderer = _this$props10.emptyRenderer;
      if (data && data.length) return null;

      var headerHeight = this._getHeaderHeight();

      return _react["default"].createElement("div", {
        className: this._prefixClass('empty-layer'),
        style: {
          top: headerHeight,
          bottom: footerHeight
        }
      }, (0, _utils.renderElement)(emptyRenderer));
    }
  }, {
    key: "renderOverlay",
    value: function renderOverlay() {
      var overlayRenderer = this.props.overlayRenderer;
      return _react["default"].createElement("div", {
        className: this._prefixClass('overlay')
      }, !!overlayRenderer && (0, _utils.renderElement)(overlayRenderer));
    }
  }, {
    key: "render",
    value: function render() {
      var _cn8;

      var _this$props11 = this.props,
          columns = _this$props11.columns,
          children = _this$props11.children,
          width = _this$props11.width,
          fixed = _this$props11.fixed,
          data = _this$props11.data,
          frozenData = _this$props11.frozenData,
          expandColumnKey = _this$props11.expandColumnKey,
          disabled = _this$props11.disabled,
          className = _this$props11.className,
          style = _this$props11.style,
          footerHeight = _this$props11.footerHeight,
          classPrefix = _this$props11.classPrefix;

      this._resetColumnManager(getColumns(columns, children), fixed);

      if (expandColumnKey) {
        this._data = this._flattenOnKeys(data, this.getExpandedRowKeys(), this.props.rowKey);
      } else {
        this._data = data;
      } // should be after `this._data` assigned


      this._calcScrollbarSizes();

      var containerStyle = _objectSpread({}, style, {
        width: width,
        height: this._getTableHeight(),
        position: 'relative'
      });

      var cls = (0, _classnames["default"])(classPrefix, className, (_cn8 = {}, (0, _defineProperty2["default"])(_cn8, "".concat(classPrefix, "--fixed"), fixed), (0, _defineProperty2["default"])(_cn8, "".concat(classPrefix, "--expandable"), !!expandColumnKey), (0, _defineProperty2["default"])(_cn8, "".concat(classPrefix, "--empty"), data.length === 0), (0, _defineProperty2["default"])(_cn8, "".concat(classPrefix, "--has-frozen-rows"), frozenData.length > 0), (0, _defineProperty2["default"])(_cn8, "".concat(classPrefix, "--has-frozen-columns"), this.columnManager.hasFrozenColumns()), (0, _defineProperty2["default"])(_cn8, "".concat(classPrefix, "--disabled"), disabled), _cn8));
      return _react["default"].createElement("div", {
        ref: this._setContainerRef,
        className: cls,
        style: containerStyle
      }, this.renderMainTable(), this.renderLeftTable(), this.renderRightTable(), this.renderResizingLine(), this.renderEmptyLayer(), this.renderOverlay());
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var scrollbarSize = this.props.getScrollbarSize();

      if (scrollbarSize > 0) {
        this.setState({
          scrollbarSize: scrollbarSize
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this$props12 = this.props,
          data = _this$props12.data,
          height = _this$props12.height,
          maxHeight = _this$props12.maxHeight;

      if (data !== prevProps.data) {
        this._lastScannedRowIndex = -1;
        this._hasDataChangedSinceEndReached = true;
      }

      if (maxHeight !== prevProps.maxHeight || height !== prevProps.height) {
        this._maybeCallOnEndReached();
      }

      this._maybeScrollbarPresenceChange();
    }
  }, {
    key: "_prefixClass",
    value: function _prefixClass(className) {
      return "".concat(this.props.classPrefix, "__").concat(className);
    }
  }, {
    key: "_setContainerRef",
    value: function _setContainerRef(ref) {
      this.tableNode = ref;
    }
  }, {
    key: "_setMainTableRef",
    value: function _setMainTableRef(ref) {
      this.table = ref;
    }
  }, {
    key: "_setLeftTableRef",
    value: function _setLeftTableRef(ref) {
      this.leftTable = ref;
    }
  }, {
    key: "_setRightTableRef",
    value: function _setRightTableRef(ref) {
      this.rightTable = ref;
    }
  }, {
    key: "_getComponent",
    value: function _getComponent(name) {
      if (this.props.components && this.props.components[name]) return this.props.components[name];
      return DEFAULT_COMPONENTS[name];
    }
  }, {
    key: "_getHeaderHeight",
    value: function _getHeaderHeight() {
      var headerHeight = this.props.headerHeight;

      if (Array.isArray(headerHeight)) {
        return headerHeight.reduce(function (sum, height) {
          return sum + height;
        }, 0);
      }

      return headerHeight;
    }
  }, {
    key: "_getFrozenRowsHeight",
    value: function _getFrozenRowsHeight() {
      var _this$props13 = this.props,
          frozenData = _this$props13.frozenData,
          rowHeight = _this$props13.rowHeight;
      return frozenData.length * rowHeight;
    }
  }, {
    key: "_getTableHeight",
    value: function _getTableHeight() {
      var _this$props14 = this.props,
          height = _this$props14.height,
          maxHeight = _this$props14.maxHeight,
          footerHeight = _this$props14.footerHeight;
      var tableHeight = height;
      var footer = footerHeight || 0;

      if (maxHeight > 0) {
        var frozenRowsHeight = this._getFrozenRowsHeight();

        var totalRowsHeight = this.getTotalRowsHeight();

        var headerHeight = this._getHeaderHeight();

        var totalHeight = headerHeight + frozenRowsHeight + totalRowsHeight + footer + this._horizontalScrollbarSize;
        tableHeight = Math.min(totalHeight, maxHeight);
      } else {
        var _frozenRowsHeight = this._getFrozenRowsHeight();

        var _totalRowsHeight = this.getTotalRowsHeight();

        var _headerHeight = this._getHeaderHeight();

        var _totalHeight = _headerHeight + _frozenRowsHeight + _totalRowsHeight + footer + this._horizontalScrollbarSize;

        tableHeight = Math.min(_totalHeight, height);
      }

      return tableHeight;
    }
  }, {
    key: "_getBodyHeight",
    value: function _getBodyHeight() {
      return this._getTableHeight() - this._getHeaderHeight() - this._getFrozenRowsHeight();
    }
  }, {
    key: "_getFrozenContainerHeight",
    value: function _getFrozenContainerHeight() {
      var _this$props15 = this.props,
          maxHeight = _this$props15.maxHeight,
          footerHeight = _this$props15.footerHeight;
      var footer = footerHeight || 0;
      var tableHeight = this._getTableHeight() - (this._data.length > 0 ? this._horizontalScrollbarSize : 0); // in auto height mode tableHeight = totalHeight

      if (maxHeight > 0) return tableHeight;
      var totalHeight = this.getTotalRowsHeight() + this._getHeaderHeight() + this._getFrozenRowsHeight() + footer;
      return Math.min(tableHeight, totalHeight);
    }
  }, {
    key: "_calcScrollbarSizes",
    value: function _calcScrollbarSizes() {
      var _this$props16 = this.props,
          fixed = _this$props16.fixed,
          width = _this$props16.width;
      var scrollbarSize = this.state.scrollbarSize;
      var totalRowsHeight = this.getTotalRowsHeight();
      var totalColumnsWidth = this.getTotalColumnsWidth();
      var prevHorizontalScrollbarSize = this._horizontalScrollbarSize;
      var prevVerticalScrollbarSize = this._verticalScrollbarSize;

      if (scrollbarSize === 0) {
        this._horizontalScrollbarSize = 0;
        this._verticalScrollbarSize = 0;
      } else {
        // we have to set `this._horizontalScrollbarSize` before calling `this._getBodyHeight`
        if (!fixed || totalColumnsWidth <= width - scrollbarSize) {
          this._horizontalScrollbarSize = 0;
          this._verticalScrollbarSize = totalRowsHeight > this._getBodyHeight() ? scrollbarSize : 0;
        } else {
          if (totalColumnsWidth > width) {
            this._horizontalScrollbarSize = scrollbarSize;
            this._verticalScrollbarSize = totalRowsHeight > this._getBodyHeight() - this._horizontalScrollbarSize ? scrollbarSize : 0;
          } else {
            this._horizontalScrollbarSize = 0;
            this._verticalScrollbarSize = 0;

            if (totalRowsHeight > this._getBodyHeight()) {
              this._horizontalScrollbarSize = scrollbarSize;
              this._verticalScrollbarSize = scrollbarSize;
            }
          }
        }
      }

      if (prevHorizontalScrollbarSize !== this._horizontalScrollbarSize || prevVerticalScrollbarSize !== this._verticalScrollbarSize) {
        this._scrollbarPresenceChanged = true;
      }
    }
  }, {
    key: "_maybeScrollbarPresenceChange",
    value: function _maybeScrollbarPresenceChange() {
      if (this._scrollbarPresenceChanged) {
        var onScrollbarPresenceChange = this.props.onScrollbarPresenceChange;
        this._scrollbarPresenceChanged = false;
        onScrollbarPresenceChange({
          size: this.state.scrollbarSize,
          horizontal: this._horizontalScrollbarSize > 0,
          vertical: this._verticalScrollbarSize > 0
        });
      }
    }
  }, {
    key: "_maybeCallOnEndReached",
    value: function _maybeCallOnEndReached() {
      var _this$props17 = this.props,
          onEndReached = _this$props17.onEndReached,
          onEndReachedThreshold = _this$props17.onEndReachedThreshold;
      var scrollTop = this._scroll.scrollTop;
      var scrollHeight = this.getTotalRowsHeight();

      var clientHeight = this._getBodyHeight();

      if (!onEndReached || !clientHeight || !scrollHeight) return;
      var distanceFromEnd = scrollHeight - scrollTop - clientHeight + this._horizontalScrollbarSize;

      if (this._lastScannedRowIndex >= 0 && distanceFromEnd <= onEndReachedThreshold && (this._hasDataChangedSinceEndReached || scrollHeight !== this._scrollHeight)) {
        this._hasDataChangedSinceEndReached = false;
        this._scrollHeight = scrollHeight;
        onEndReached({
          distanceFromEnd: distanceFromEnd
        });
      }
    }
  }, {
    key: "_handleScroll",
    value: function _handleScroll(args) {
      var lastScrollTop = this._scroll.scrollTop;
      this.scrollToPosition(args);
      this.props.onScroll(args);
      if (args.scrollTop > lastScrollTop) this._maybeCallOnEndReached();
    }
  }, {
    key: "_handleVerticalScroll",
    value: function _handleVerticalScroll(_ref11) {
      var scrollTop = _ref11.scrollTop;
      var lastScrollTop = this._scroll.scrollTop;
      this.scrollToTop(scrollTop);
      if (scrollTop > lastScrollTop) this._maybeCallOnEndReached();
    }
  }, {
    key: "_handleRowsRendered",
    value: function _handleRowsRendered(args) {
      this.props.onRowsRendered(args);

      if (args.overscanStopIndex > this._lastScannedRowIndex) {
        this._lastScannedRowIndex = args.overscanStopIndex;

        this._maybeCallOnEndReached();
      }
    }
  }, {
    key: "_handleRowHover",
    value: function _handleRowHover(_ref12) {
      var hovered = _ref12.hovered,
          rowKey = _ref12.rowKey;
      this.setState({
        hoveredRowKey: hovered ? rowKey : null
      });
    }
  }, {
    key: "_handleRowClick",
    value: function _handleRowClick(_ref13) {
      var clicked = _ref13.clicked,
          rowKey = _ref13.rowKey;
      this.setState({
        clickedRowKey: clicked && this.state.clickedRowKey !== rowKey ? rowKey : null
      });
    }
  }, {
    key: "_handleRowExpand",
    value: function _handleRowExpand(_ref14) {
      var expanded = _ref14.expanded,
          rowData = _ref14.rowData,
          rowIndex = _ref14.rowIndex,
          rowKey = _ref14.rowKey;
      var expandedRowKeys = (0, _utils.cloneArray)(this.getExpandedRowKeys());

      if (expanded) {
        if (!expandedRowKeys.indexOf(rowKey) >= 0) expandedRowKeys.push(rowKey);
      } else {
        var index = expandedRowKeys.indexOf(rowKey);

        if (index > -1) {
          expandedRowKeys.splice(index, 1);
        }
      } // if `expandedRowKeys` is uncontrolled, update internal state


      if (this.props.expandedRowKeys === undefined) {
        this.setState({
          expandedRowKeys: expandedRowKeys
        });
      }

      this.props.onRowExpand({
        expanded: expanded,
        rowData: rowData,
        rowIndex: rowIndex,
        rowKey: rowKey
      });
      this.props.onExpandedRowsChange(expandedRowKeys);
    }
  }, {
    key: "_handleColumnResize",
    value: function _handleColumnResize(_ref15, width) {
      var key = _ref15.key;
      this.columnManager.setColumnWidth(key, width);
      this.setState({
        resizingWidth: width
      });
      var column = this.columnManager.getColumn(key);
      this.props.onColumnResize({
        column: column,
        width: width
      });
    }
  }, {
    key: "_handleColumnResizeStart",
    value: function _handleColumnResizeStart(_ref16) {
      var key = _ref16.key;
      this.setState({
        resizingKey: key
      });
    }
  }, {
    key: "_handleColumnResizeStop",
    value: function _handleColumnResizeStop() {
      var _this$state = this.state,
          resizingKey = _this$state.resizingKey,
          resizingWidth = _this$state.resizingWidth;
      this.setState({
        resizingKey: null,
        resizingWidth: 0
      });
      if (!resizingKey || !resizingWidth) return;
      var column = this.columnManager.getColumn(resizingKey);
      this.props.onColumnResizeEnd({
        column: column,
        width: resizingWidth
      });
    }
  }, {
    key: "_handleColumnSort",
    value: function _handleColumnSort(event) {
      var key = event.currentTarget.dataset.key;
      var _this$props18 = this.props,
          sortBy = _this$props18.sortBy,
          sortState = _this$props18.sortState,
          onColumnSort = _this$props18.onColumnSort;
      var order = _SortOrder["default"].ASC;

      if (sortState) {
        order = sortState[key] === _SortOrder["default"].ASC ? _SortOrder["default"].DESC : _SortOrder["default"].ASC;
      } else if (key === sortBy.key) {
        order = sortBy.order === _SortOrder["default"].ASC ? _SortOrder["default"].DESC : _SortOrder["default"].ASC;
      }

      var column = this.columnManager.getColumn(key);
      onColumnSort({
        column: column,
        key: key,
        order: order
      });
    }
  }]);
  return BaseTable;
}(_react["default"].PureComponent);

BaseTable.Column = _Column["default"];
BaseTable.PlaceholderKey = _ColumnManager["default"].PlaceholderKey;
BaseTable.defaultProps = {
  classPrefix: 'BaseTable',
  rowKey: 'id',
  data: [],
  frozenData: [],
  fixed: false,
  headerHeight: 50,
  rowHeight: 50,
  footerHeight: 0,
  defaultExpandedRowKeys: [],
  sortBy: {},
  useIsScrolling: false,
  overscanRowCount: 1,
  onEndReachedThreshold: 500,
  getScrollbarSize: _utils.getScrollbarSize,
  onScroll: _utils.noop,
  onRowsRendered: _utils.noop,
  onScrollbarPresenceChange: _utils.noop,
  onRowExpand: _utils.noop,
  onExpandedRowsChange: _utils.noop,
  onColumnSort: _utils.noop,
  onColumnResize: _utils.noop,
  onColumnResizeEnd: _utils.noop
};
BaseTable.propTypes = {
  /**
   * Prefix for table's inner className
   */
  classPrefix: _propTypes["default"].string,

  /**
   * Class name for the table
   */
  className: _propTypes["default"].string,

  /**
   * Custom style for the table
   */
  style: _propTypes["default"].object,

  /**
   * A collection of Column
   */
  children: _propTypes["default"].node,

  /**
   * Columns for the table
   */
  columns: _propTypes["default"].arrayOf(_propTypes["default"].shape(_Column["default"].propTypes)),

  /**
   * The data for the table
   */
  data: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,

  /**
   * The data be frozen to top, `rowIndex` is negative and started from `-1`
   */
  frozenData: _propTypes["default"].arrayOf(_propTypes["default"].object),

  /**
   * The key field of each data item
   */
  rowKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]).isRequired,

  /**
   * The width of the table
   */
  width: _propTypes["default"].number.isRequired,

  /**
   * The height of the table, will be ignored if `maxHeight` is set
   */
  height: _propTypes["default"].number,

  /**
   * The max height of the table, the table's height will auto change when data changes,
   * will turns to vertical scroll if reaches the max height
   */
  maxHeight: _propTypes["default"].number,

  /**
   * The height of each table row
   */
  rowHeight: _propTypes["default"].number.isRequired,

  /**
   * The height of the table header, set to 0 to hide the header, could be an array to render multi headers.
   */
  headerHeight: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].arrayOf(_propTypes["default"].number)]).isRequired,

  /**
   * The height of the table footer
   */
  footerHeight: _propTypes["default"].number,

  /**
   * Whether the width of the columns are fixed or flexible
   */
  fixed: _propTypes["default"].bool,

  /**
   * Whether the table is disabled
   */
  disabled: _propTypes["default"].bool,

  /**
   * Custom renderer on top of the table component
   */
  overlayRenderer: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].element]),

  /**
   * Custom renderer when the length of data is 0
   */
  emptyRenderer: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].element]),

  /**
   * Custom footer renderer, available only if `footerHeight` is larger then 0
   */
  footerRenderer: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].element]),

  /**
   * Custom header renderer
   * The renderer receives props `{ cells, columns, headerIndex }`
   */
  headerRenderer: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].element]),

  /**
   * Custom row renderer
   * The renderer receives props `{ isScrolling, cells, columns, rowData, rowIndex, depth }`
   */
  rowRenderer: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].element]),

  /**
   * Class name for the table header, could be a callback to return the class name
   * The callback is of the shape of `({ columns, headerIndex }) => string`
   */
  headerClassName: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),

  /**
   * Class name for the table row, could be a callback to return the class name
   * The callback is of the shape of `({ columns, rowData, rowIndex }) => string`
   */
  rowClassName: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),

  /**
   * Extra props applied to header element
   * The handler is of the shape of `({ columns, headerIndex }) object`
   */
  headerProps: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func]),

  /**
   * Extra props applied to header cell element
   * The handler is of the shape of `({ columns, column, columnIndex, headerIndex }) => object`
   */
  headerCellProps: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func]),

  /**
   * Extra props applied to row element
   * The handler is of the shape of `({ columns, rowData, rowIndex }) => object`
   */
  rowProps: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func]),

  /**
   * Extra props applied to row cell element
   * The handler is of the shape of `({ columns, column, columnIndex, rowData, rowIndex }) => object`
   */
  cellProps: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func]),

  /**
   * Extra props applied to ExpandIcon component
   * The handler is of the shape of `({ rowData, rowIndex, depth, expandable, expanded }) => object`
   */
  expandIconProps: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func]),

  /**
   * The key for the expand column which render the expand icon if the data is a tree
   */
  expandColumnKey: _propTypes["default"].string,

  /**
   * Default expanded row keys when initialize the table
   */
  defaultExpandedRowKeys: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number])),

  /**
   * Controlled expanded row keys
   */
  expandedRowKeys: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number])),

  /**
   * A callback function when expand or collapse a tree node
   * The handler is of the shape of `({ expanded, rowData, rowIndex, rowKey }) => *`
   */
  onRowExpand: _propTypes["default"].func,

  /**
   * A callback function when the expanded row keys changed
   * The handler is of the shape of `(expandedRowKeys) => *`
   */
  onExpandedRowsChange: _propTypes["default"].func,

  /**
   * The sort state for the table, will be ignored if `sortState` is set
   */
  sortBy: _propTypes["default"].shape({
    /**
     * Sort key
     */
    key: _propTypes["default"].string,

    /**
     * Sort order
     */
    order: _propTypes["default"].oneOf([_SortOrder["default"].ASC, _SortOrder["default"].DESC])
  }),

  /**
   * Multiple columns sort state for the table
   *
   * example:
   * ```js
   * {
   *   'column-0': SortOrder.ASC,
   *   'column-1': SortOrder.DESC,
   * }
   * ```
   */
  sortState: _propTypes["default"].object,

  /**
   * A callback function for the header cell click event
   * The handler is of the shape of `({ column, key, order }) => *`
   */
  onColumnSort: _propTypes["default"].func,

  /**
   * A callback function when resizing the column width
   * The handler is of the shape of `({ column, width }) => *`
   */
  onColumnResize: _propTypes["default"].func,

  /**
   * A callback function when resizing the column width ends
   * The handler is of the shape of `({ column, width }) => *`
   */
  onColumnResizeEnd: _propTypes["default"].func,

  /**
   * Adds an additional isScrolling parameter to the row renderer.
   * This parameter can be used to show a placeholder row while scrolling.
   */
  useIsScrolling: _propTypes["default"].bool,

  /**
   * Number of rows to render above/below the visible bounds of the list
   */
  overscanRowCount: _propTypes["default"].number,

  /**
   * Custom scrollbar size measurement
   */
  getScrollbarSize: _propTypes["default"].func,

  /**
   * A callback function when scrolling the table
   * The handler is of the shape of `({ scrollLeft, scrollTop, horizontalScrollDirection, verticalScrollDirection, scrollUpdateWasRequested }) => *`
   *
   * `scrollLeft` and `scrollTop` are numbers.
   *
   * `horizontalDirection` and `verticalDirection` are either `forward` or `backward`.
   *
   * `scrollUpdateWasRequested` is a boolean. This value is true if the scroll was caused by `scrollTo*`,
   * and false if it was the result of a user interaction in the browser.
   */
  onScroll: _propTypes["default"].func,

  /**
   * A callback function when scrolling the table within `onEndReachedThreshold` of the bottom
   * The handler is of the shape of `({ distanceFromEnd }) => *`
   */
  onEndReached: _propTypes["default"].func,

  /**
   * Threshold in pixels for calling `onEndReached`.
   */
  onEndReachedThreshold: _propTypes["default"].number,

  /**
   * A callback function with information about the slice of rows that were just rendered
   * The handler is of the shape of `({ overscanStartIndex, overscanStopIndex, startIndex， stopIndex }) => *`
   */
  onRowsRendered: _propTypes["default"].func,

  /**
   * A callback function when the scrollbar presence state changed
   * The handler is of the shape of `({ size, vertical, horizontal }) => *`
   */
  onScrollbarPresenceChange: _propTypes["default"].func,

  /**
   * A object for the row event handlers
   * Each of the keys is row event name, like `onClick`, `onDoubleClick` and etc.
   * Each of the handlers is of the shape of `({ rowData, rowIndex, rowKey, event }) => object`
   */
  rowEventHandlers: _propTypes["default"].object,

  /**
   * A object for the custom components, like `ExpandIcon` and `SortIndicator`
   */
  components: _propTypes["default"].shape({
    TableCell: _propTypes["default"].func,
    TableHeaderCell: _propTypes["default"].func,
    TableFooterCell: _propTypes["default"].func,
    ExpandIcon: _propTypes["default"].func,
    SortIndicator: _propTypes["default"].func
  })
};
var _default = BaseTable;
exports["default"] = _default;
//# sourceMappingURL=BaseTable.js.map
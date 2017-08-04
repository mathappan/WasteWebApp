import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _values from 'lodash/values';
import _get from 'lodash/get';
import _has from 'lodash/has';
import _forEach from 'lodash/forEach';
import _mapValues from 'lodash/mapValues';

import PropTypes from 'prop-types';
import React, { cloneElement } from 'react';

import { customPropTypes, getChildMapping, getElementType, getUnhandledProps, makeDebugger, mergeChildMappings, META, SUI } from '../../lib';
import Transition from './Transition';

var debug = makeDebugger('transition_group');

/**
 * A Transition.Group animates children as they mount and unmount.
 */

var TransitionGroup = function (_React$Component) {
  _inherits(TransitionGroup, _React$Component);

  function TransitionGroup() {
    var _ref;

    _classCallCheck(this, TransitionGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = TransitionGroup.__proto__ || Object.getPrototypeOf(TransitionGroup)).call.apply(_ref, [this].concat(args)));

    _initialiseProps.call(_this);

    var children = _this.props.children;

    _this.state = { children: _mapValues(getChildMapping(children), function (child) {
        return _this.wrapChild(child);
      }) };
    return _this;
  }

  _createClass(TransitionGroup, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      debug('componentWillReceiveProps()');

      var prevMapping = this.state.children;

      var nextMapping = getChildMapping(nextProps.children);
      var children = mergeChildMappings(prevMapping, nextMapping);

      _forEach(children, function (child, key) {
        var hasPrev = _has(prevMapping, key);
        var hasNext = _has(nextMapping, key);
        var prevChild = prevMapping[key];

        var isLeaving = !_get(prevChild, 'props.visible');

        // item is new (entering), should be wrapped
        if (hasNext && (!hasPrev || isLeaving)) {
          children[key] = _this2.wrapChild(child, true);
          return;
        }

        // item is old (exiting), should be updated
        if (!hasNext && hasPrev && !isLeaving) {
          children[key] = cloneElement(prevChild, { visible: false });
          return;
        }

        // item hasn't changed transition states, copy over the last transition props;
        var _prevChild$props = prevChild.props,
            visible = _prevChild$props.visible,
            transitionOnMount = _prevChild$props.transitionOnMount;


        children[key] = cloneElement(child, { visible: visible, transitionOnMount: transitionOnMount });
      });

      this.setState({ children: children });
    }
  }, {
    key: 'render',
    value: function render() {
      debug('render');
      debug('props', this.props);
      debug('state', this.state);

      var children = this.state.children;

      var ElementType = getElementType(TransitionGroup, this.props);
      var rest = getUnhandledProps(TransitionGroup, this.props);

      return React.createElement(
        ElementType,
        rest,
        _values(children)
      );
    }
  }]);

  return TransitionGroup;
}(React.Component);

TransitionGroup.defaultProps = {
  animation: 'fade',
  duration: 500
};
TransitionGroup._meta = {
  name: 'TransitionGroup',
  parent: 'Transition',
  type: META.TYPES.MODULE
};
TransitionGroup.handledProps = ['animation', 'as', 'children', 'duration'];

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.handleOnHide = function (nothing, childProps) {
    debug('handleOnHide', childProps);
    var reactKey = childProps.reactKey;


    _this3.setState(function (state) {
      var children = _extends({}, state.children);
      delete children[reactKey];

      return { children: children };
    });
  };

  this.wrapChild = function (child) {
    var transitionOnMount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var _props = _this3.props,
        animation = _props.animation,
        duration = _props.duration;
    var key = child.key;


    return React.createElement(Transition, {
      animation: animation,
      children: child,
      duration: duration,
      key: key,
      onHide: _this3.handleOnHide,
      reactKey: key,
      transitionOnMount: transitionOnMount
    });
  };
};

export default TransitionGroup;
process.env.NODE_ENV !== "production" ? TransitionGroup.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Named animation event to used. Must be defined in CSS. */
  animation: PropTypes.oneOf(SUI.TRANSITIONS),

  /** Primary content. */
  children: PropTypes.node,

  /** Duration of the CSS transition animation in milliseconds. */
  duration: PropTypes.number
} : void 0;
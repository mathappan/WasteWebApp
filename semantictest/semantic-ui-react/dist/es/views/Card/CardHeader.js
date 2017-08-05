import _extends from 'babel-runtime/helpers/extends';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, META } from '../../lib';

/**
 * A card can contain a header.
 */
function CardHeader(props) {
  var children = props.children,
      className = props.className,
      content = props.content;

  var classes = cx(className, 'header');
  var rest = getUnhandledProps(CardHeader, props);
  var ElementType = getElementType(CardHeader, props);

  return React.createElement(
    ElementType,
    _extends({}, rest, { className: classes }),
    childrenUtils.isNil(children) ? content : children
  );
}

CardHeader.handledProps = ['as', 'children', 'className', 'content'];
CardHeader._meta = {
  name: 'CardHeader',
  parent: 'Card',
  type: META.TYPES.VIEW
};

process.env.NODE_ENV !== "production" ? CardHeader.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : void 0;

export default CardHeader;
import _extends from 'babel-runtime/helpers/extends';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, META } from '../../lib';

/**
 * A card can contain a description with one or more paragraphs.
 */
function CardDescription(props) {
  var children = props.children,
      className = props.className,
      content = props.content;

  var classes = cx(className, 'description');
  var rest = getUnhandledProps(CardDescription, props);
  var ElementType = getElementType(CardDescription, props);

  return React.createElement(
    ElementType,
    _extends({}, rest, { className: classes }),
    childrenUtils.isNil(children) ? content : children
  );
}

CardDescription.handledProps = ['as', 'children', 'className', 'content'];
CardDescription._meta = {
  name: 'CardDescription',
  parent: 'Card',
  type: META.TYPES.VIEW
};

process.env.NODE_ENV !== "production" ? CardDescription.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : void 0;

export default CardDescription;
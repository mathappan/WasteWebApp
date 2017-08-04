import _extends from 'babel-runtime/helpers/extends';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, META } from '../../lib';

function StepDescription(props) {
  var children = props.children,
      className = props.className,
      description = props.description;

  var classes = cx('description', className);
  var rest = getUnhandledProps(StepDescription, props);
  var ElementType = getElementType(StepDescription, props);

  return React.createElement(
    ElementType,
    _extends({}, rest, { className: classes }),
    childrenUtils.isNil(children) ? description : children
  );
}

StepDescription.handledProps = ['as', 'children', 'className', 'description'];
StepDescription._meta = {
  name: 'StepDescription',
  parent: 'Step',
  type: META.TYPES.ELEMENT
};

process.env.NODE_ENV !== "production" ? StepDescription.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  description: customPropTypes.contentShorthand
} : void 0;

export default StepDescription;
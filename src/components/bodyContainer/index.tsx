/**
 * BodyContainer
 */
import React from 'react';

// Components
import FormLoader from '../formLoader';


// Style
import './style.scss';

type Prop = {
  id ?: string,
  style ?: {},
  children ?: string | Array<boolean | string | Object | []> | Object,
  isLoader ?: boolean,
  className ?: string
};

type Parameters = {
  id ?: string,
  style ?: {},
  className ?: string
}

const BodyContainer = ({ id, isLoader, children, className, style }: Prop) => {
  const parameters: Parameters = {};
  if (id) parameters.id = id;
  if (style) parameters.style = style;
  if (className) parameters.className = `body-container ${className}`;
  return (
    <div {...parameters}>
      { children }
      { isLoader && <FormLoader /> }
    </div>
  );
};
BodyContainer.defaultProps = {
  isLoader: false
};
export default BodyContainer;

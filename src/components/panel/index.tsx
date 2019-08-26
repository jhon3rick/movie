/**
 * Panel
 */
import React from 'react';
import './style.scss';

type Props = {
  type: 'div' | 'span' | 'ol' | 'ul' | 'li',
  style ?: {},
  children: Array<any> | Object | string,
  className: string
}

const Panel = ({ type, children, ...props }: Props) => {
  props.className = 'panel ' + props.className;
  switch (type) {
    case 'div':
      return <div {...props}>{ children }</div>;
    case 'span':
      return <span {...props}>{ children }</span>;
    case 'ol':
      return <ol {...props}>{ children }</ol>;
    case 'ul':
      return <ul {...props}>{ children }</ul>;
    case 'li':
      return <li {...props}>{ children }</li>;
    default:
      return <div {...props}>{ children }</div>;
  }
};
Panel.defaultProps = {
  type: 'div',
  style: {},
  className: ''
};
export default Panel;
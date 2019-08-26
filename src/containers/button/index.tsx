/**
 * Button
 */
import React, { ReactElement } from 'react';
import './style.scss';

type Props = {
  size ?: 'small' | 'mid' | 'big',
  type ?: 'horizontal' | 'vertical' | 'circle',
  style ?: {},
  onClick: (e: Object)=>void,
  children: string | Array<Object | []> | Object | ReactElement,
  addClass ?: string,
  fontIcon ?: string,
  className ?: string,
  classRipple ?: string
}

type State = {
  status: string
}

class Button extends React.Component <Props, State> {
  static defaultProps: Object;
  timeOutStatus: any;
  timeOutClick: any;
  state = {
    status: 'available'
  }
  componentWillUnmount = () => {
    clearTimeout(this.timeOutClick);
    clearTimeout(this.timeOutStatus);
  };
  _onClick = (e: Object) => {
    const { onClick } = this.props;
    const { status } = this.state;
    if (status !== 'available') return;

    this.setState({ status: 'block' });

    this.timeOutClick = setTimeout(()=>onClick(e), 300);
    this.timeOutStatus = setTimeout(()=>this.setState({ status: 'available' }), 3000);
  }
  render () {
    const { status } = this.state;
    let { classRipple } = this.props;
    const {
      size,
      type,
      style,
      fontIcon,
      children,
      addClass,
      className
    } = this.props;

    if (!classRipple) classRipple = className;
    if (type !== 'vertical') return (
      <div
        style={style}
        onClick={this._onClick}
        className={`btn btn-${type} ${className} ripple-${classRipple} ${status} size-${size}`}
      >{children}</div>
    );

    return (
      <div
        style={style}
        onClick={this._onClick}
        className={`btn btn-${type} ${className} ripple-${classRipple} ${addClass && addClass}`}
      >
        <div className="btn-icon icon-container text-center">
          <span className={`svg-icon ${fontIcon}`}></span>
        </div>
        <div className="btn-label">{children}</div>
      </div>
    );
  }
}
Button.defaultProps = {
  size: 'mid',
  type: 'horizontal',
  style: {},
  onClick: ()=>{},
  className: 'btn-gray',
  classRipple: 'red'
};
export default Button;
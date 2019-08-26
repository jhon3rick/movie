/**
 * @flow
 * FormInputSelect
 */
import React, { Component, ReactElement } from 'react';
import './style.scss';

type ElementDom = {
  target: {
    value: string
  }
};

type Props = {
  name: string,
  style: {},
  label: string,
  value: string,
  options: Array<Object>,
  setText: (optionItem: {})=>void,
  onChange: (value: string, e: ElementDom)=>void,
  disabled: boolean,
  mutedText: string,
  className: string,
  iconAfter: string,
  iconBefore: string,
  classLabel: string,
  labelActive: boolean,
  defaultText: string,
  defaultBlank: boolean,
  optionFieldId: string,
  optionFieldText: string
}

type State = {
  focus: boolean,
  active: boolean
};

class FormInputSelect extends Component <Props, State> {
  static defaultProps: Object;
  nameInput ?: Object;
  constructor (props: Props) {
    super(props);
    this.state = {
      focus: false,
      active: (props.labelActive)? true: false
    };
  }

  _toggleActive = () => {
    this.setState({ active: true, focus: true });
  }
  _isEmpty = (e: ElementDom) => {
    const { labelActive } = this.props;
    if (!labelActive && e.target.value === ''){
      this.setState({ active: false, focus: false });
    }
    else {
      this.setState({ focus: false });
    }
  }
  _rowOptions = (options: Array<Object>, optionFieldId: string, optionFieldText: string) => {
    if (!options[0]) return;
    const { setText } = this.props;

    if (typeof options[0] === 'string' || typeof options[0] === 'number'){
      // @ts-ignore
      return options.map<string>((item, index) => <option key={`select-option-${index}`} value={item}>{item}</option>);
    }
    // @ts-ignore
    if (setText) return options.map<string>((item, index) => <option key={`select-option-${index}`} value={item[optionFieldId]}>{setText(item)}</option>);
    // @ts-ignore
    return options.map<string>((item, index) => <option key={`select-option-${index}`} value={item[optionFieldId]}>{item[optionFieldText]}</option>);
  }
  render () {
    const {
      focus,
      active
    } = this.state;
    const {
      name,
      style,
      className,
      label,
      value,
      options,
      onChange,
      disabled,
      mutedText,
      iconAfter,
      iconBefore,
      classLabel,
      defaultText,
      defaultBlank,
      optionFieldId,
      optionFieldText
    } = this.props;
    const labelClass1 = iconBefore? ' with-icon': '';
    const labelClass2 = active && focus? ' label-active': '';
    const labelClass3 = (value && value !== '') || focus? ' focus': ' empty';
    return (
      <div className={`form-input-select${labelClass2}${labelClass3} ${className}` } style={style}>
        { iconBefore && <span className={'icon-' + iconBefore} /> }
        <label htmlFor={name} className={`${labelClass1}${classLabel}`} >
          {label}{' '}
          {mutedText && <span className="muted-text">{mutedText}</span>}
        </label>
        <select
          id={name}
          // @ts-ignore
          ref={input => this.nameInput = input}
          name={name}
          value={value || ''}
          onBlur={this._isEmpty}
          onFocus={this._toggleActive}
          disabled={disabled}
          onChange={e => {
            const element = e.target;
            const value = element.value;
            onChange (
              value,
              e
            );
          }}
          className={`${active || value !== '' ? ' filled' : ''}`}
        >
          { defaultBlank && <option value="">{defaultText}</option> }
          { this._rowOptions(options, optionFieldId, optionFieldText) }
        </select>
        { iconAfter && <span className={'after-icon-select icon-' + iconAfter} /> }
      </div>
    );
  }
}
FormInputSelect.defaultProps = {
  style: {},
  value: '',
  options: [],
  onChange: ()=>{},
  classLabel: '',
  labelActive: false,
  defaultText: '',
  defaultBlank: true,
  optionFieldId: 'id',
  optionFieldText: 'name'
};
export default FormInputSelect;

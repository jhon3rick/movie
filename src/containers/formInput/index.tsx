/**
 * tslint:disable
 * FormInput
 */
import React, { Component } from 'react';
import './style.scss';

// Alias
import { Props, State, Input } from './flow';
// import Button from '../button';

type Params = {
  ref ?: ()=>void,
  value ?: string,
  onChange ?: (p: any)=>void
}

class FormInput extends Component<Props, State> {
  static defaultProps: Object;
  constructor (props: Props){
    super(props);
    this.state = {
      focus: false,
      active: props.labelActive? true: false,
      nameFile: ''
    };
  }
  _toggleActive = () => {
    this.setState({ active: true, focus: true });
  };
  _isEmpty = (e: Input) => {
    const { labelActive } = this.props;

    if (!labelActive && e.target.value === ''){
      this.setState({ active: false, focus: false });
    }
    else {
      this.setState({ focus: false });
    }
  };

  _checkValidation = (validationName: string, validationValue: number, value: string) => {
    let responseValue = value;

    if (validationName === 'numeric_positive') {
      let isValid = true;
      isValid = (isValid && (/^\d*$/).test(value));
      isValid = isValid && (parseInt(value) > 0 || value === '');
      responseValue = !isValid ? (value.toString().slice(0, value.length -1)) : responseValue;
    }

    if (validationName === 'max_length') {
      const max = validationValue;
      if (value.toString().length > max) responseValue = value.substring(0, max);
    }

    return responseValue;
  }

  render () {
    let { nameFile } = this.state;
    const { active, focus } = this.state;
    var {
      max,
      min,
      validations,
      nameFile: propsNameFile,
      type,
      name,
      style,
      label,
      value,
      onPaste,
      readOnly,
      onChange,
      disabled,
      iconAfter,
      mutedText,
      reference,
      iconBefore,
      parentClass,
      inputClass
    } = this.props;

    nameFile = (propsNameFile && propsNameFile !== '' && nameFile === '') ? propsNameFile : nameFile;

    const labelClass1 = iconBefore? 'with-icon': '';
    const labelClass2 = active && focus? ' label-active': '';
    const labelClass3 = ((value!==null && value !== '') || nameFile !== '') || focus? ' focus': ' empty';
    const params: Params = {};

    if (type !== 'file') { params.value = value; }
    if (reference) params.ref = reference;

    if (onChange) {
      params.onChange = (event) => {
        const { nameFile } = this.state;
        let { value } = event.target;
        const { files } = event.target;
        if (files && files[0] && files[0].name !== nameFile) this.setState({ nameFile: files[0].name });

        // @ts-ignore
        if (!validations) onChange(value, event);

        for (var validation in validations) {
          if (validations.hasOwnProperty(validation)) {
            // @ts-ignore
            value = this._checkValidation(validation, validations[validation], value);
            // @ts-ignore
            onChange(value, event);
          }
        }

      };
    }

    return (
      <div className={`form-input${labelClass2}${labelClass3} ${parentClass}`} style={style}>
        { iconBefore && <span className={'before-icon icon-' + iconBefore} /> }

        <label id={`label-${name}`} htmlFor={name} className={`${labelClass1}`}>
          {max ? `${label} (caracteres ${ max - value.toString().length})`: label}
          { mutedText && <span className="muted-text">{mutedText}</span> }

          { (type === 'file') &&
            <div id={`span-file-${name}`} className="span-file">
              <span>{nameFile}</span>
              {/* <Button className="btn-img" onClick={()=>console.log('click button')}>x</Button>  */}
            </div>
          }

        </label>

        <input
          {...params}
          id={name}
          max={max}
          min={min}
          type={type}
          name={name}
          onBlur={this._isEmpty}
          onFocus={this._toggleActive}
          onPaste={onPaste}
          disabled={disabled}
          readOnly={readOnly}
          className={`${labelClass3} ${active || value !== '' ? 'filled' : ''} ${inputClass}`}
          autoComplete="off"
        />
        { iconAfter && <span className={'after-icon icon-' + iconAfter} /> }
      </div>
    );
  }
}
FormInput.defaultProps = {
  type: 'text',
  style: {},
  value: '',
  readOnly: false,
  onChange: ()=>{},
  iconAfter: '',
  iconBefore: '',
  parentClass: ''
};
export default FormInput;

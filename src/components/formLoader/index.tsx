/**
 * @flow
 * FormLoader
 */
import React from 'react';

// my components
import FormModal from '../formModal';

import './style.scss';

type Props = {
  style ?: Object,
  parentStyle ?: Object
}

const FormLoader = ({ style, parentStyle }: Props) => (
  <FormModal style={parentStyle}>
    <div className="form-loader" style={style}>
      <div className="form-loader-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="form-loader-text">Loading...</div>
    </div>
  </FormModal>
);
export default FormLoader;

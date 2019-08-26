/**
 * FormCheckbox
 */
import React from 'react';
import './style.scss';
import { Prompt } from 'react-router-dom';

type Props = {
  open: boolean,
  text ?: string
}

const ConfirmExit = ({ open, text }: Props) => (
  <Prompt
    when={open}
    message={ () => (text ? text : 'Deseas salir sin guardar?') }
  />
);

export default ConfirmExit;
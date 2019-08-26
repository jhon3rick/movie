// @flow

export type Validations = {
  email ?: boolean,
  max_length ?: number,
  numeric_positive ?: boolean,
}


export type Props = {
  max ?: number,
  min ?: number,
  type ?: 'text' | 'data' | 'time' | 'password'| 'file',
  name ?: string,
  style ?: {},
  value: string,
  label: string,
  onPaste ?: (e: {})=>void,
  onChange ?: (val: string, item: {})=>void,
  nameFile ?: string,
  disabled ?: boolean,
  readOnly ?: boolean,
  iconAfter ?: string,
  mutedText ?: string,
  reference ?: ()=>void,
  iconBefore ?: string,
  validations ?: Validations,
  labelActive ?: boolean,
  inputClass ?: string,
  parentClass ?: string
}

export type State = {
  focus: boolean,
  active: boolean,
  nameFile: string
}

export type Input = {
  target: {
    value: String
  }
}
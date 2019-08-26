/**
 * FormModal
 */
import React from 'react';
import './style.scss';

type Props = {
  style ?: Object,
  onClick: ()=>void,
  children ?: string | Array<Object | []> | Object,
  className ?: string,
  isOpenModal: boolean,
  styleModalCenter: Object
}

const FormModal = ({
  style,
  onClick,
  children,
  className,
  isOpenModal,
  styleModalCenter
}: Props) => (
  isOpenModal ? (
    <div className={`body-modal ${className || ''}`} style={style} onClick={onClick}>
      <div className="body-center" style={styleModalCenter}>
        {children? children: []}
      </div>
    </div>
  ) : (<div style={{ display: 'none' }} />)
);
FormModal.defaultProps = {
  onClick: ()=>{},
  isOpenModal: true,
  styleModalCenter: {}
};
export default FormModal;
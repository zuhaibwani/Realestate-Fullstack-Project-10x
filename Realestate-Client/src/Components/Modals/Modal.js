import React from 'react';
import ReactDom from 'react-dom';
import './Modals.css';

const Modal = ({open,children,onClose}) =>{
    if(!open) return null
return ReactDom.createPortal(
    <>
         <div className='modal_styles'>
        <div className='column'>
        {children}
        <button className='butn' onClick={onClose}>CLOSE</button>
        </div>
        
        </div>
    </>,
    document.getElementById('portal')
   
)

}
export default Modal;
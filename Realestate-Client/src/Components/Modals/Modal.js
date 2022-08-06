import React from 'react';
import ReactDom from 'react-dom';
import './Modals.css';

// const OVERLAY_STYLES={
//     position:'fixed',
//     top:'0',
//     left:'0',
//     right:'0',
//     bottom:'0',
//     backgroungColor:'rgba(0,0,0, .7)',
//     zIndex:1000
// }

const Modal = ({open,children,onClose}) =>{
    if(!open) return null
return ReactDom.createPortal(
    <>
        {/* <div style={OVERLAY_STYLES}/> */}
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
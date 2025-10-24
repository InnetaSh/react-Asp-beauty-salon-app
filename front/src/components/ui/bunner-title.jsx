import React from 'react';
import CardActionsBtn from './card-actions-btn';
const BunnerTitle = ({title, onAdd }) => {
    return (
             <div className='title-container'>
                
                <h3 className='title'><CardActionsBtn onAdd={onAdd}/>{title}</h3>
                <div className='bottom-line'></div>
            </div>
    );
};
export default BunnerTitle;

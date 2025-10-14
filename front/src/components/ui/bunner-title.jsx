import React from 'react';

const BunnerTitle = ({title }) => {
    return (
             <div className='title-container'>
                <h3 className='title'>{title}</h3>
                <div className='bottom-line'></div>
            </div>
    );
};
export default BunnerTitle;

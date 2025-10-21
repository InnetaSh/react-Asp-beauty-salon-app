import React from 'react';
import Img from './img';

const ImgList = ({  onEdit, onDelete,portfolio }) => {
    const containerClass = portfolio.length === 1 ? 'img-list-container-first' : 'img-list-container';

    return (
        <div className="img-list">
            <div className={containerClass}>
                {portfolio.map((img) => (
                    <Img
                        key={img.id}
                        portfolio={img}        
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}

            </div>
        </div>
    );
};

export default ImgList;

import React from 'react';
import BunnerImgItem from './bunner-img-item';

const BunnerImg = ({ bunners }) => {
    return (
        
            <div className="bunner-img-container">
                {bunners.map((bunner) => (
                    <BunnerImgItem
                        key={bunner.id}
                        imageSrc={bunner.imageSrc}
                        title={bunner.title}
                        
                    />
                ))}
            </div>
      
    );
};
export default BunnerImg;
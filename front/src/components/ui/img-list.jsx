import React from 'react';
import Img from './img';

const ImgList = ({ images }) => {
    return (
        <div className="img-list">
            <div className="img-list-container">
                {images.map((img) => (
                    <Img
                        key={img.id}
                        imageSrc={img.imageSrc}
                    />
                ))}
            </div>
        </div>
    );
};
export default ImgList;
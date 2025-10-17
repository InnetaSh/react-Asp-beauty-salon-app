import React from 'react';
import Img from './img';

const ImgList = ({ images }) => {
    const containerClass = images.length === 1 ? 'img-list-container-first' : 'img-list-container';

    return (
        <div className="img-list">
            <div className={containerClass}>
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

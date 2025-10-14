import React from 'react';
 

const BunnerImgItem = ({ imageSrc, title }) => {
  return (
    <div className="card">
       <div className="card-container-500">
      <div className="card-container-wrapper">
        <img src={imageSrc} alt={title}  />
      </div>
      </div>
    </div>
  );
};

export default BunnerImgItem;

import React from 'react';
import Button from './Button'; 

const BunnerItem = ({ imageSrc, title, description, onLearnMore }) => {
  return (
    <div className="bunner">
      <div className="bunner-image-wrapper">
        <img src={imageSrc} alt={title}  />
      </div>
      <div className="bunner-content">
        <h3 className="bunner-title">{title}</h3>
        <p className="card-text">{description}</p>
        <Button onClick={onLearnMore} text= "READ MORE" />
      </div>
    </div>
  );
};

export default BunnerItem;

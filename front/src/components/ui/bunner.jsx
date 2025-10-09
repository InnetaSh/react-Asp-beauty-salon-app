import React from 'react';
import Button from './Button'; 

const Bunner = ({ imageSrc, title, text: description, onLearnMore }) => {
  return (
    <div className="bunner">
      <div className="bunner-image-wrapper">
        <img src={imageSrc} alt={title} className="bunner-image" />
      </div>
      <div className="bunner-content">
        <h3 className="bunner-title">{title}</h3>
        <p className="card-text">FROM ${description}</p>
        <Button onClick={onLearnMore} text= "READ MORE" />
      </div>
    </div>
  );
};

export default Bunner;

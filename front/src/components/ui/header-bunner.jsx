import React from 'react';
import Button from './Button'; 

const HeaderBunner = ({ imageSrc, title, description, onLearnMore }) => {
  return (
    <div className="header-bunner">
      <div className="header-bunner-image-wrapper">
        <img src={imageSrc} alt={title} className="header-bunner-image" />
      </div>
      <div className="header-bunner-content">
        <h3 className="header-bunner-title">{title}</h3>
        <p className="card-text">{description}</p>
        <Button onClick={onLearnMore} text= "READ MORE" />
      </div>
    </div>
  );
};

export default HeaderBunner;

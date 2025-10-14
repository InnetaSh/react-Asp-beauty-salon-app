import React from 'react';
import ButtonDark from './Button-dark';

const CardSubService = ({ imageSrc, title, price,description,  onLearnMore }) => {
  return (
    <div className="card">
      <div className="card-container">
        <div className="card-image-wrapper">
          <img src={imageSrc} alt={title} className="card-image" />
        </div>
      </div>

      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-price">{price}</p>
        <p className="card-price">{description}</p>
        <ButtonDark onClick={onLearnMore} text="LEARN MORE" />
      </div>
    

    </div>
  );
};

export default CardSubService;

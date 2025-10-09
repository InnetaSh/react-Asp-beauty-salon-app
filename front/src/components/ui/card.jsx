import React from 'react';
import Button from './Button'; 

const Card = ({ imageSrc, title, price, onLearnMore }) => {
  return (
    <div className="card">
      <div className="card-image-wrapper">
        <img src={imageSrc} alt={title} className="card-image" />
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-price">FROM ${price}</p>
        <Button onClick={onLearnMore} text="LEARN MORE" />
      </div>
    </div>
  );
};

export default Card;

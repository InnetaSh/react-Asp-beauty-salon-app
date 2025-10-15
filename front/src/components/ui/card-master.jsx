import React from 'react';
import ButtonDark from './Button-dark';

const CardMaster = ({ photo, name, onLearnMore,text="LEARN MORE" , customClass = "" }) => {
  return (
      <div className="card">
      <div className={`card-container ${customClass}`}>
        <div className="card-image-wrapper">
          <img src={`/${photo}`} alt={name} className="card-image" />

        </div>
      </div>

      <div className="card-content">
        <h3 className="card-title">{name}</h3>
      
        <ButtonDark onClick={onLearnMore} text={text} />
      </div>
    

    </div>
  );
};

export default CardMaster;

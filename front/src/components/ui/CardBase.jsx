import React from 'react';
import ButtonDark from './Button-dark';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import CardActionsBtn from "../ui/card-actions-btn"

const CardBase = ({
  imageSrc,
  title,
  price,
  buttonText = "LEARN MORE",
  onLearnMore,
  onEdit,
  onDelete,
  customClass = "",
  showPrice = true,
  showActions = true,
  customContent, 
}) => {
  return (
    <div className="card">
      {customContent ? (
        <div className={`card-add ${customClass}`}>
          {customContent}
        </div>
      ) : (
        <>
          <div className={`card-container ${customClass}`}>
            {showActions && <CardActionsBtn onEdit={onEdit} onDelete={onDelete} />}

            <div className="card-image-wrapper">
              <img src={imageSrc} alt={title} className="card-image" />
            </div>
          </div>

          <div className="card-content">
            <h3 className="card-title">{title}</h3>
            {showPrice && <p className="card-price">{price}</p>}
            <ButtonDark onClick={onLearnMore} text={buttonText} />
          </div>
        </>
      )}
    </div>
  );
};


export default CardBase;

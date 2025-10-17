import React from 'react';
import ButtonDark from './Button-dark';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

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
}) => {
  return (
    <div className="card">
      <div className={`card-container ${customClass}`}>
        {showActions && (
          <div className="card-actions">
            {onEdit && (
              <button onClick={onEdit} className="card-action-button edit">
                <FaEdit />
              </button>
            )}
            {onDelete && (
              <button onClick={onDelete} className="card-action-button delete">
                <FaTrashAlt />
              </button>
            )}
          </div>
        )}

        <div className="card-image-wrapper">
          <img src={imageSrc} alt={title} className="card-image" />
        </div>
      </div>

      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        {showPrice && <p className="card-price">{price}</p>}
        <ButtonDark onClick={onLearnMore} text={buttonText} />
      </div>
    </div>
  );
};

export default CardBase;

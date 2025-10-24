import React from 'react';
import CardActionsBtn from "./card-actions-btn";
import ButtonDark from './Button-dark';
import PngPlus from '../../img/png-plus.png'

const ImgWithButton = ({ onEdit, onDelete, portfolio = {}, onLearnMore, buttonText }) => {
  const imageSrc = portfolio?.imageSrc && portfolio.imageSrc.trim() !== ""
    ? portfolio.imageSrc
    : PngPlus;


  const handleEdit = () => {
    console.log("Редактировать (onEdit) нажато");
    if (onEdit) onEdit(portfolio.id);
  };

  const handleDelete = () => {
    console.log("Удалить (onDelete) нажато");
    if (onDelete) onDelete(portfolio.id);
  };

  return (
    <div className="img">
      <CardActionsBtn onEdit={() => onEdit(portfolio)} onDelete={() => onDelete(portfolio.id)} />
      <div className="img-image-wrapper">
        <img
          src={imageSrc}
          alt={portfolio?.title || "portfolio item"}
          className={!portfolio?.imageSrc ? "img-placeholder" : ""}
        />
      </div>
      <div className="card-content">

        <ButtonDark onClick={onLearnMore} text={buttonText} />
      </div>
    </div>
  );
};

export default ImgWithButton;



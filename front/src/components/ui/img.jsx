import React from 'react';
import CardActionsBtn from "../ui/card-actions-btn";

const Img = ({ onEdit, onDelete,portfolio }) => {
  
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
        <img src={portfolio.imageSrc} alt="work" />
      </div>
    </div>
  );
};

export default Img;



import React from 'react';
import Card from './card';
import { FaPlus } from 'react-icons/fa';
import PngPlus from '../../img/png-plus.png'

const CardList = ({
  products,
  onLearnMore,
  onDelete,
  onEdit,
  onAdd,
  learnMoreKey = 'category',
  editMode = true
}) => {
  const role = localStorage.getItem("role");
  if (role === "Client") {
    editMode = false;
  }

  return (
    <div className="card-list">
      <div className="card-list-container">
        {products.map((product) => (
          <Card
            key={product.id}
            imageSrc={product.imageSrc}
            title={product.title}
            price={product.price}
            onLearnMore={() => onLearnMore(product[learnMoreKey])}
            onDelete={() => onDelete(product.id)}
            onEdit={() => onEdit(product)}
          />
        ))}


        {editMode && onAdd && (
          <Card
            key="add-card"
            imageSrc={PngPlus}
            title=""
            price=""
            onLearnMore={onAdd}
            buttonText="Добавить сервис"
            customClass="add-card"
          />
        )}
      </div>
    </div>
  );
};

export default CardList;

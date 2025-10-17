import React from 'react';
import Card from './card';

const CardList = ({
  products,
  onLearnMore,
  onDelete,
  onEdit,
  learnMoreKey = 'category' 
}) => {
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
      </div>
    </div>
  );
};

export default CardList;

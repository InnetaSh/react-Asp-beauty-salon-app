import React from 'react';
import Card from './card'; 

const CardList = ({ products, onLearnMore }) => {
  return (
    <div className="card-list"> 
        {products.map((product) => (
            <Card
                key={product.id}
                imageSrc={product.imageSrc}
                title={product.title}
                price={product.price}
                onLearnMore={() => onLearnMore(product.id)}
            />
        ))}
    </div>
    );
};
export default CardList;
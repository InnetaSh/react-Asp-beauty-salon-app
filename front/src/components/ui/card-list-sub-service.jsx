import React from 'react';
import CardSubService from './card-sub-service';

const CardListSubService = ({ products, onLearnMore }) => {
    return (
        <div className="card-list">
            <div className="card-list-container">
                {products.map((product) => (
                    <CardSubService
                        key={product.id}
                        imageSrc={product.imageSrc}
                        title={product.title}
                        price={product.price}
                        onLearnMore={() => onLearnMore(product.title)}
                    />
                ))}
            </div>
        </div>
    );
};
export default CardListSubService;
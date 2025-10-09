import React, { useEffect, useState } from 'react';
import CardList from '../ui/card-list';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/UI/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleLearnMore = (id) => {
    console.log('Learn more about product', id);
    
  };

  return <CardList products={products} onLearnMore={handleLearnMore} />;
};

export default Products;

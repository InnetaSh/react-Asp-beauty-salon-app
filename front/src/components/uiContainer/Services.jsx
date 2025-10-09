import React, { useEffect, useState } from 'react';
import CardList from '../ui/card-list';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('/api/UI/services')
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);

  const handleLearnMore = (id) => {
    console.log('Learn more about product', id);
    
  };

  return <CardList products={services} onLearnMore={handleLearnMore} />;
};

export default Services;

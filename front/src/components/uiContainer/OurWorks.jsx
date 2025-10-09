import React, { useEffect, useState } from 'react';
import CardList from '../ui/card-list';

const OurWorks = () => {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    fetch('/api/UI/ourWork')
      .then(res => res.json())
      .then(data => setWorks(data));
  }, []);
console.log(works);
  const handleLearnMore = (id) => {
    console.log('Learn more about product', id);
    
  };

  return <CardList products={works} onLearnMore={handleLearnMore} />;
};

export default OurWorks;

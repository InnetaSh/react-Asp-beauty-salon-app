import React, { useEffect, useState } from 'react';
import HeaderItem from '../ui/header-item';

const WeddingBunner = () => {
  const [bunner, setBunner] = useState([]);

  useEffect(() => {
    fetch('/api/UI/wedding')
      .then(res => res.json())
      .then(data => setBunner(data));
  }, []);

  const handleLearnMore = (id) => {
    console.log('Learn more about topServices', id);
    
  };

  return <HeaderItem bunners={bunner} onLearnMore={handleLearnMore} />;
};

export default WeddingBunner;

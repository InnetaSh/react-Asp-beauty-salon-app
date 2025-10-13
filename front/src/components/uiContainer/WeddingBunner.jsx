import React, { useEffect, useState } from 'react';
import Bunner from '../ui/bunner';

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

  return <Bunner
      flag={false}
      title = "Wedding Services"
       bunners={bunner} onLearnMore={handleLearnMore}
      

  />;
};

export default WeddingBunner;

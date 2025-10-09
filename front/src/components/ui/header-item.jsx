import React, { useState, useEffect } from 'react';
import Bunner from './bunner';

const HeaderItem = ({ bunners, onLearnMore }) => {
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % bunners.length);
    }, 10000);

    return () => clearInterval(interval); 
  }, [bunners.length]);

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? bunners.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % bunners.length);
  };

  if (bunners.length === 0) {
    return <div>Загрузка...</div>;
  }

  const currentBunner = bunners[currentIndex];

  return (
    <div className="bunner-slider">
      <button onClick={handlePrev} aria-label="Previous slide">&lt;</button>

      <Bunner
        key={currentBunner.id}
        imageSrc={currentBunner.imageSrc}
        title={currentBunner.title}
        description={currentBunner.description}
        onLearnMore={() => onLearnMore(currentBunner.id)}
      />

      <button onClick={handleNext} aria-label="Next slide">&gt;</button>
    </div>
  );
};

export default HeaderItem;

import React, { useState, useEffect } from 'react';
import HeaderBunner from './header-bunner';

import '../../index.css';

const HeaderItem = ({ bunners, onLearnMore }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % bunners.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [bunners.length]);

  const handlePrev = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? bunners.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % bunners.length);
  };

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  if (bunners.length === 0) {
    return <div>Загрузка...</div>;
  }

  const currentBunner = bunners[currentIndex];

  return (
    <div className="bunner-slider">
      <div className="slider-btn-container">
        <button onClick={handlePrev} className="slider-btn" aria-label="Previous slide">
          &lt;
        </button>
        <button onClick={handleNext} className="slider-btn" aria-label="Next slide">
          &gt;
        </button>
      </div>

      <HeaderBunner
        key={currentBunner.id}
        imageSrc={currentBunner.imageSrc}
        title={currentBunner.title}
        description={currentBunner.description}
        onLearnMore={() => onLearnMore(currentBunner.id)}
      />

   
      <div className="slider-indicators">
        {bunners.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderItem;

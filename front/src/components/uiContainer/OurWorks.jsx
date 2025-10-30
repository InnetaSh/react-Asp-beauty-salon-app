import React, { useEffect, useState } from 'react';
import ImgList from '../ui/img-list';

const OurWorks = (isMain = false) => {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    fetch('/api/Portfolio')
      .then(res => res.json())
      .then(data => 
        { const portfolio = isMain ? data.filter(item => item.topPortfolio) : data;

          setWorks(portfolio)
  });
  }, []);
console.log(works);
  const handleLearnMore = (id) => {
    console.log('Learn more about product', id);
    
  };

return (
   <div>
      <div className='title-container'>
        <h3 className='title'>Our Work</h3>
        <div className='bottom-line'></div>
      </div>
       <ImgList images={works} onLearnMore={handleLearnMore} />;
    </div>
  );
};
export default OurWorks;

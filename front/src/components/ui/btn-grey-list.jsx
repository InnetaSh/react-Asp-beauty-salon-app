import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatUrlToCategory } from '../../utils/urlHelpers';
import ButtonGrey from './Button-grey';

const BtnGreyList = ({ categories, onClick}) => {
  const { category } = useParams();
  const decodedCategory = formatUrlToCategory(category);
  const [active, setActive] = useState(decodedCategory);
 

  const handleClick = (category) => {
    setActive(category);
    if (onClick) {
      onClick(category); 
    }
    
  };

  return (
    <div className="menu-column-list">
      {categories.map((category) => (
        <ButtonGrey
          key={category}
          text={category}
         className={active.toLowerCase() === category.toLowerCase() ? 'btn-grey-active' : ''}

          onClick={() => handleClick(category)}
        />
      ))}
    </div>
  );
};

export default BtnGreyList;

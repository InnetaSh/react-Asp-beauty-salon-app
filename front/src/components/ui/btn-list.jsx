import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const BtnList = ({ type_list = [], onSelect }) => {
  const navigate = useNavigate();

  const handleClick = (type) => {
    
  

  
    if (onSelect) {
      onSelect(type);
    }
  };

  return (
    <div className="menu-list">
      {type_list.map((type) => (
        <Button
          key={type}
          text={type}
          onClick={() => handleClick(type)}
        />
      ))}
    </div>
  );
};

export default BtnList;

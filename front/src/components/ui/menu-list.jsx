import React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuText from './menu-text';

const MenuList = ({ menu_list }) => {
  const navigate = useNavigate();

const handleClick = (item) => {
    if (item.action) {
      item.action();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div className="menu-list">
      {menu_list.map((item) => (
        <MenuText
          key={item.path}
          title={item.title}
            onClick={() => handleClick(item)}
        />
      ))}
    </div>
  );
};

export default MenuList;

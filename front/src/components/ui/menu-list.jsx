import React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuText from './menu-text';

const MenuList = ({ menu_list }) => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="menu-list">
      {menu_list.map((item) => (
        <MenuText
          key={item.path}
          title={item.title}
          onClick={() => handleClick(item.path)}
        />
      ))}
    </div>
  );
};

export default MenuList;

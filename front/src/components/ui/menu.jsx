import React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuList from './menu-list';

const Menu = ({ menu_list, name }) => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="menu-container">
          <h3 className="salon-title">{name}</h3>
          <div className="menu">
              <MenuList menu_list={menu_list} onLearnMore={() => {}} />
          </div>
        </div>
  );
};

export default Menu;

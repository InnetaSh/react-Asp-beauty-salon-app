import React from 'react';
import Menu from './menu'; 

const Header = ({ title, menu_list }) => {
  return (
    <div className="header">
      <div className="header-content">
        <h3 className="salon-title">{title}</h3>
        <div className="menu-content">
            <Menu menu_list={menu_list} onLearnMore={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default Header;

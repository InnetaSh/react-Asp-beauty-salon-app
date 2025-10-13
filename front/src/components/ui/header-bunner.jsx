import React from 'react';
import Button from './Button'; 
import MenuList from './menu-list';
import Menu from '../ui/menu';



const HeaderBunner = ({ imageSrc, title,name, menu_list, description, onLearnMore, flagMain}) => {
  return (
    <div
      className={`header-bunner ${flagMain ? "header-bunner-500" : "header-bunner-200"}`}
    >
      <div className= "header-bunner-image-wrapper" >

        <img src={imageSrc} alt={title} className="header-bunner-image" />
      </div>
      <Menu menu_list={menu_list} name = {name}/>
      {flagMain && (
      <div className="header-bunner-content">
        <h3 className="header-bunner-title">{title}</h3>
        <p className="card-text">{description}</p>
        <Button onClick={onLearnMore} text= "READ MORE" />

      </div>
      )}
    </div>
  );
};

export default HeaderBunner;

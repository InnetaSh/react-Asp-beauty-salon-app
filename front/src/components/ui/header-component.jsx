import React, { useState, useEffect } from 'react';
import HeaderBunner from './header-bunner';

import '../../index.css';


const HeaderComponent = ({ bunners = [], onLearnMore, name, menu_list }) => {
  return (
    <div className="bunner-slider">
      {bunners.length > 0 ? (
        bunners.map((bunner) => (
          <HeaderBunner
            key={bunner.id}
            imageSrc={bunner.imageSrc}
            title={bunner.title}
            description={bunner.description}
            onLearnMore={() => onLearnMore(bunner.id)}
            name={name}
            menu_list={menu_list}
            flagMain={false}
          />
        ))
      ) : (
        <p className="no-bunners-text">No bunners available</p>
      )}
    </div>
  );
};

export default HeaderComponent;

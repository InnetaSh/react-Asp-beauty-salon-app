import React from 'react';
import Bunner from './bunner'; 

const HeaderItem = ({ bunners, onLearnMore }) => {
  return (
    <div className="bunner-list"> 
        {bunners.map((bunner) => (
            <Bunner
                key={bunner.id}
                imageSrc={bunner.imageSrc}
                title={bunner.title}
                description={bunner.description}
                onLearnMore={() => onLearnMore(bunner.id)}
            />
        ))}
    </div>
    );
};
export default HeaderItem;
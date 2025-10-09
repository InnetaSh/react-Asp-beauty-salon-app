import React from 'react';
import BunnerItem from './bunner-item';

const Bunner = ({ bunners, onLearnMore }) => {
    return (
        <div className="bunner-container">
                {bunners.map((bunner) => (
                    <BunnerItem
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
export default Bunner;
import React from 'react';
import BunnerItem from './bunner-item';
import BunnerTitle from './bunner-title';

const Bunner = ({ bunners, onLearnMore, flag,title }) => {
    return (
        <div>
            {flag && (
                <BunnerTitle title={title} />
           
            )}
            <div className="bunner-container">
                {bunners.map((bunner) => (
                    <BunnerItem
                        key={bunner.id}
                        imageSrc={bunner.imageSrc}
                        title={bunner.category}
                        description={bunner.description}
                        onLearnMore={() => onLearnMore(bunner.id)}
                    />
                ))}
            </div>
        </div>
    );
};
export default Bunner;
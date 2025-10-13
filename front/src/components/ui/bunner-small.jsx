import React from 'react';
import BunnerItem from './bunner-item';

const BunnerSmall = ({ bunners, onLearnMore, flag,title }) => {
    return (
        <div>
            {flag && (
            <div className='title-container'>
                <h3 className='title'>{title}</h3>
                <div className='bottom-line'></div>
            </div>
            )}
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
        </div>
    );
};
export default BunnerSmall;
import React from 'react';
import CardMaster from './card-master';

const CardListMaster = ({ masters, onLearnMore,onDelete,
  onEdit,buttonText }) => {
    return (
        <div className="card-list">
            <div className="card-list-container">
                {masters.map((master) => (
                    <CardMaster
                        key={master.id}
                        imageSrc={master.imageSrc}
                        name={master.name}
                       buttonText={buttonText}
                        onLearnMore={() => onLearnMore(master.id)}
                        onDelete={() => onDelete(master.id)}
                        onEdit={() => onEdit(master)}
                    />
                ))}
            </div>
        </div>
    );
};
export default CardListMaster;
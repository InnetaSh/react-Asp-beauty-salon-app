import React from 'react';
import CardMaster from './card-master';

const CardListMaster = ({ masters, onLearnMore,onDelete,
  onEdit, }) => {
    return (
        <div className="card-list">
            <div className="card-list-container">
                {masters.map((master) => (
                    <CardMaster
                        key={master.id}
                        imageSrc={master.imageSrc}
                        name={master.name}
                       
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
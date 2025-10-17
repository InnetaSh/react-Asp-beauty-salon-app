import React from 'react';
import CardMaster from './card-master';

const CardListMaster = ({ masters, onLearnMore }) => {
    return (
        <div className="card-list">
            <div className="card-list-container">
                {masters.map((master) => (
                    <CardMaster
                        key={master.id}
                        imageSrc={master.imageSrc}
                        name={master.name}
                       
                        onLearnMore={() => onLearnMore(master.id)}
                         onDelete={() => console.log("Удалить")}
                        onEdit={() => console.log("Редактировать")}
                    />
                ))}
            </div>
        </div>
    );
};
export default CardListMaster;
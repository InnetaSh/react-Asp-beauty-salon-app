import React from 'react';
import CardMaster from './card-master';
import PngPlus from '../../img/png-plus.png'

const CardListMaster = ({
    masters,
    onLearnMore,
    onDelete,
    onEdit,
    onAdd,
    editMode = true,
    buttonText
}) => {
    const role = localStorage.getItem("role");
    if (role === "Client") {
        editMode = false;
    }

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
                {editMode && onAdd && (
                    <CardMaster
                        key="add-card"
                        imageSrc={PngPlus}
                        name=""
                        onLearnMore={onAdd}
                        buttonText="Добавить мастера"
                        customClass="add-card"
                    />
                )}
            </div>
        </div>
    );
};
export default CardListMaster;
import React from 'react';
import Img from './img';
import ImgWithButton from './img-with-button';
import PngPlus from '../../img/png-plus.png'

const ImgList = ({ 
    onEdit,
    onDelete,
    portfolio,
    onAdd,
    isMain,
    editMode = true
}) => {
    const containerClass = portfolio.length === 1 ? 'img-list-container-first' : 'img-list-container';
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (role === "Client") {
    return null; 
  }

    return (
        <div className="img-list">
            <div className={containerClass}>
                {portfolio.map((img) => (
                    <Img
                        key={img.id}
                        portfolio={img}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
                {!isMain && editMode && onAdd && token != null && role != "Client" &&  (
          <ImgWithButton
            key="add-card"
            portfolio={PngPlus}
            
            onLearnMore={onAdd}
            buttonText="Добавить портфолио"
            customClass="add-card"
          />
        )}

            </div>
        </div>
    );
};

export default ImgList;

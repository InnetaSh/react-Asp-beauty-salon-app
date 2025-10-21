import React, { useState } from 'react';
import '../../index.css';

const EditSubServiceModal = ({ service, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...service });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/Services/subservice/${formData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (!res.ok) throw new Error('Ошибка обновления');
        onSave();
        onClose();
      })
      .catch(console.error);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Редактировать сервис</h2>
        <form onSubmit={handleSubmit}>
            <div className='modal-input-container'>
            <label>title:</label>
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Название" required />
         </div>
          <div className='modal-input-container'>
            <label>price:</label>
          <input name="price" value={formData.price} onChange={handleChange} placeholder="Цена" />
          </div>
          <div className='modal-input-container'>
            <label>imageSrc:</label>
          <input name="imageSrc" value={formData.imageSrc} onChange={handleChange} placeholder="URL изображения" />
          </div>
          <div className='modal-input-container'>
            <label>description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Описание" />
          </div>
          <div className="modal-buttons">
            <button type="submit">Сохранить</button>
            <button type="button" onClick={onClose}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSubServiceModal;

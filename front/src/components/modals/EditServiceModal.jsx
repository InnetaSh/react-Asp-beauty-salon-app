import React, { useState } from 'react';
import '../../index.css';

const EditServiceModal = ({ service, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...service });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/Services/${formData.id}`, {
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
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Название" required />
          <input name="category" value={formData.category} onChange={handleChange} placeholder="Категория" />
          <input name="price" value={formData.price} onChange={handleChange} placeholder="Цена" />
          <input name="imageSrc" value={formData.imageSrc} onChange={handleChange} placeholder="URL изображения" />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Описание" />
          <div className="modal-buttons">
            <button type="submit">Сохранить</button>
            <button type="button" onClick={onClose}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditServiceModal;

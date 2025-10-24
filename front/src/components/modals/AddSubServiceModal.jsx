import React, { useState } from 'react';
import '../../index.css';

const AddSubServiceModal = ({ categoryId, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    imageSrc: '',
    description: '',
    categoryId: categoryId || null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/Services/subservice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Ошибка при создании под-сервиса');

      onSave(); 
      onClose(); 
    } catch (error) {
      console.error('Ошибка создания под-сервиса:', error);
      alert('Не удалось создать под-сервис');
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Добавить под-сервис</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal-input-container">
            <label>Название:</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Название"
              required
            />
          </div>

          <div className="modal-input-container">
            <label>Цена:</label>
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Цена"
            />
          </div>

          <div className="modal-input-container">
            <label>URL изображения:</label>
            <input
              name="imageSrc"
              value={formData.imageSrc}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="modal-input-container">
            <label>Описание:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Описание услуги"
            />
          </div>

          <div className="modal-buttons">
            <button type="submit">Создать</button>
            <button type="button" onClick={onClose}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubServiceModal;

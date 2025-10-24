import React, { useState } from 'react';
import '../../index.css';

const AddServiceModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    imageSrc: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/Services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (!res.ok) throw new Error('Ошибка при добавлении сервиса');
        onSave();  // обновляем список после добавления
        onClose(); // закрываем модальное окно
      })
      .catch(console.error);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Добавить сервис</h2>
        <form onSubmit={handleSubmit}>
          <div className='modal-input-container'>
            <label>Title:</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Название"
              required
            />
          </div>
          <div className='modal-input-container'>
            <label>Category:</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Категория"
            />
          </div>
          <div className='modal-input-container'>
            <label>Price:</label>
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Цена"
            />
          </div>
          <div className='modal-input-container'>
            <label>Image URL:</label>
            <input
              name="imageSrc"
              value={formData.imageSrc}
              onChange={handleChange}
              placeholder="URL изображения"
            />
          </div>
          <div className='modal-input-container'>
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Описание"
            />
          </div>

          <div className="modal-buttons">
            <button type="submit">Добавить</button>
            <button type="button" onClick={onClose}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceModal;

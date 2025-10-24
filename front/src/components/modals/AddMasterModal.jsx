import React, { useState } from 'react';
import '../../index.css';

const AddMasterModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    experience: '',
    specialization: '',
    imageSrc: '',
    description: '',
    topMaster: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/Masters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        console.error('Ошибка при добавлении мастера');
        return;
      }

      onSave(); 
      onClose(); 
    } catch (error) {
      console.error('Ошибка при создании мастера:', error);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Добавить мастера</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal-input-container">
            <label>Имя:</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Имя мастера"
              required
            />
          </div>

          <div className="modal-input-container">
            <label>Опыт:</label>
            <input
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Опыт работы"
            />
          </div>

          <div className="modal-input-container">
            <label>Специализация:</label>
            <input
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              placeholder="Специализация"
            />
          </div>

          <div className="modal-input-container">
            <label>URL фотографии:</label>
            <input
              name="imageSrc"
              value={formData.imageSrc}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div className="modal-input-container">
            <label>Описание:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Краткое описание мастера"
            />
          </div>

          <div className="modal-checkbox-container">
            <label className="modal-checkbox-label">Топ-мастер</label>
            <input
              className="modal-checkbox-input"
              type="checkbox"
              name="topMaster"
              checked={formData.topMaster}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  topMaster: e.target.checked,
                }))
              }
            />
          </div>

          <div className="modal-buttons">
            <button type="submit">Создать</button>
            <button type="button" onClick={onClose}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMasterModal;

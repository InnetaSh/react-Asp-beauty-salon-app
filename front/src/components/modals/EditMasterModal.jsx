import React, { useState } from 'react';
import '../../index.css';

const EditMasterModal = ({ master, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...master });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/Masters/${formData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => {

        if (!res.ok) console.log("ошибка");;

      })
      .then(() => {

        onSave();
        onClose();
      })
      .catch(console.error);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Редактировать мастера</h2>
        <form onSubmit={handleSubmit}>
          <div className='modal-input-container'>
            <label>name:</label>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Имя" required />
          </div>
          <div className='modal-input-container'>
            <label>experience:</label>
            <input name="experience" value={formData.experience} onChange={handleChange} placeholder="Опыт" />
          </div>
          <div className='modal-input-container'>
            <label>specialization:</label>
            <input name="specialization" value={formData.specialization} onChange={handleChange} placeholder="Специализация" />
          </div>
          <div className='modal-input-container'>
            <label>photo:</label>
            <input name="imageSrc" value={formData.imageSrc} onChange={handleChange} placeholder="URL изображения" />
          </div>
          <div className='modal-input-container'>
            <label>description:</label>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Описание" />
          </div>
          <div className='modal-checkbox-container'>
            <label className="modal-checkbox-label">
              Топ-мастер
            </label>
            <input
              className='modal-checkbox-input'
              type="checkbox"
              name="topMaster"
              checked={formData.topMaster || false}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  topMaster: e.target.checked,
                }))
              }
            />
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

export default EditMasterModal;

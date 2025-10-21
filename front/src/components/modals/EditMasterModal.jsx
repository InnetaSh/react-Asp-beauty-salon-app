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
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Имя" required />
          <input name="experience" value={formData.experience} onChange={handleChange} placeholder="Опыт" />
          <input name="specialization" value={formData.specialization} onChange={handleChange} placeholder="Специализация" />
          <input name="imageSrc" value={formData.imageSrc} onChange={handleChange} placeholder="URL изображения" />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Описание" />
          <label className="checkbox-label">
            <input
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
            Топ-мастер
          </label>

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

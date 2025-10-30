import React, { useState } from 'react';
import '../../index.css';

const AddPortfolioModal = ({ masterId, onClose, onSave,folderPath }) => {
  const [formData, setFormData] = useState({
    imageSrc: '',
    topPhoto: false,
    masterId: masterId || null,
  });

  const [preview, setPreview] = useState(null);
  const [imagePath, setImagePath] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
console.log('Folder path received:', folderPath);

      const folder =folderPath;
      const newPath = folder + file.name;
console.log('New image path:', newPath);
      setFormData(prev => ({ ...prev, imageSrc: newPath }));
      setImagePath(newPath);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      imageSrc: imagePath,
      topPhoto: formData.topPhoto,
      masterId: masterId,
    };

    try {
      const res = await fetch(`/api/Portfolio/${masterId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Ошибка при добавлении фото');

      onSave(); 
      onClose(); 
    } catch (err) {
      console.error('Ошибка при добавлении портфолио:', err);
      alert('Не удалось добавить фото в портфолио');
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Добавить фото в портфолио</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="imageUpload">Выберите изображение:</label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          {preview && (
            <div className="form-group">
              <label>Предпросмотр:</label>
              <img
                src={preview}
                alt="Предпросмотр"
                style={{ maxWidth: '100%', marginTop: 10 }}
              />
            </div>
          )}

          <div className="modal-checkbox-container">
            <label className="modal-checkbox-label">Сделать топ-фото</label>
            <input
              className="modal-checkbox-input"
              type="checkbox"
              name="topPhoto"
              checked={formData.topPhoto}
              onChange={(e) =>
                setFormData(prev => ({
                  ...prev,
                  topPhoto: e.target.checked,
                }))
              }
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

export default AddPortfolioModal;

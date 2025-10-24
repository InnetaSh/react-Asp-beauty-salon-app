import React, { useState } from 'react';
import '../../index.css';

const EditPortfolioModal = ({ portfolio, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...portfolio });
  const [preview, setPreview] = useState(portfolio.imageSrc); 


  const [imagePath, setImagePath] = useState(portfolio.imageSrc); 

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); 
      };
      reader.readAsDataURL(file);

      const oldPath = portfolio?.imageSrc || '';
      console.log("oldPath", oldPath);

      if (oldPath) {
        const lastSlashIndex = oldPath.lastIndexOf('/');
        const folder = lastSlashIndex !== -1 ? oldPath.substring(0, lastSlashIndex + 1) : '';
        const newPath = folder + file.name;

        setFormData(prev => ({ ...prev, imageSrc: newPath }));
        setImagePath(newPath);
        console.log("newPath", newPath);
      } else {
        console.warn('oldPath отсутствует, новый путь не сформирован');
      }
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("imagePath", imagePath);
    const payload = {
      id: formData.id,
      imageSrc: imagePath,        // отправляем путь (не base64)
      topPhoto: formData.topPhoto,
      masterId: formData.masterId,
    };

    try {
      const res = await fetch(`/api/Masters/portfolio/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Ошибка обновления");

      onSave();
      onClose();
    } catch (err) {
      console.error("Ошибка при обновлении:", err);
    }
  };



  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Редактировать фото портфолио</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="imageUpload">Выберите новое изображение:</label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {preview && (
            <div className="form-group">
              <label htmlFor="imageUpload">Ваше изображение:</label>
              <img
                src={preview}
                alt="Предпросмотр"
                style={{ maxWidth: "100%", marginTop: 10 }}
              />
            </div>
          )}

          <div className="modal-checkbox-container">
            <label className='modal-checkbox-label'>

              Сделать топ-фото
            </label>
            <input
              className='modal-checkbox-input'
              type="checkbox"
              name="topPhoto"
              checked={formData.topPhoto || false}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  topPhoto: e.target.checked,
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

export default EditPortfolioModal;

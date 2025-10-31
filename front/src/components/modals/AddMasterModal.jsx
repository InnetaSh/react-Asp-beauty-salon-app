import React, { useState, useEffect } from 'react';
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

  
  const [subServices, setSubServices] = useState([]);


  const [selectedSubServices, setSelectedSubServices] = useState([
    { subServiceId: '', price: '', duration: '' },
  ]);


  useEffect(() => {
    const fetchSubServices = async () => {
      try {
        const res = await fetch('/api/SubService');
        if (!res.ok) throw new Error('Ошибка при загрузке подуслуг');
        const list = await res.json();
        setSubServices(list);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSubServices();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData((prev) => ({ ...prev, topMaster: checked }));
  };


  const handleSubServiceChange = (index, field, value) => {
    setSelectedSubServices((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };


  const addSubService = () => {
    setSelectedSubServices((prev) => [
      ...prev,
      { subServiceId: '', price: '', duration: '' },
    ]);
  };


  const removeSubService = (index) => {
    setSelectedSubServices((prev) => prev.filter((_, i) => i !== index));
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

      const createdMaster = await res.json();
      const masterId = createdMaster.id;

   
      for (const sub of selectedSubServices) {
        if (!sub.subServiceId) continue; 
        const body = {
          masterId,
          subServiceId: sub.subServiceId,
          price: sub.price,
          duration: sub.duration,
        };

        const linkRes = await fetch('/api/SubServiceMasters', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (!linkRes.ok) {
          console.error('Ошибка при создании связи с подуслугой', sub);
        }
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
              onChange={handleCheckboxChange}
            />
          </div>

          <h2>Услуги мастера</h2>

          {selectedSubServices.map((sub, index) => (
            <div key={index} className="modal-subservice-block">
              <div className="modal-input-container">
                <label>Подуслуга:</label>
                <select
                  value={sub.subServiceId}
                  onChange={(e) =>
                    handleSubServiceChange(index, 'subServiceId', e.target.value)
                  }
                  required
                >
                  <option value="" >Выберите подуслугу</option>
                  {subServices.map((s) => (
                    <option key={s.id} value={s.id} >
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-input-container">
                <label>Цена($):</label>
                <input
                  type="number"
                  value={sub.price}
                  onChange={(e) =>
                    handleSubServiceChange(index, 'price', e.target.value)
                  }
                  placeholder="Цена услуги"
                  required
                />
              </div>

              <div className="modal-input-container">
                <label>Длительность(мин):</label>
                <input
                  type="number"
                  value={sub.duration}
                  onChange={(e) =>
                    handleSubServiceChange(index, 'duration', e.target.value)
                  }
                  placeholder="Продолжительность"
                  required
                />
              </div>

              {selectedSubServices.length > 1 && (
                <button
                  type="button"
                  className="btn-grey btn-smallHeight btn"
                  onClick={() => removeSubService(index)}
                >
                  Удалить
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="btn-grey btn-smallHeight btn"
            onClick={addSubService}
          >
            + Добавить ещё подуслугу
          </button>


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

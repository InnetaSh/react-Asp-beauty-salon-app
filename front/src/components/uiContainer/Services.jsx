import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCategoryToUrl } from '../../utils/urlHelpers';
import CardList from '../ui/card-list';
import BtnList from '../ui/btn-list';
import EditServiceModal from '../modals/EditServiceModal'

const Services = ({isMain, onLearnMore }) => {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); 
   const [editingService, setEditingService] = useState(null);

 const fetchServices = () => {
    const url = '/api/services';

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const filteredServices = isMain ? data.filter(item => item.topService) : data;
        setServices(filteredServices);
        setCategories(['All', ...new Set(filteredServices.map(item => item.category))]);
      })
      .catch(err => console.error('Ошибка при загрузке сервисов:', err));
  };

  useEffect(() => {
    fetchServices();
  }, [isMain]);


const handleLearnMore = (category) => {
  const urlCategory = formatCategoryToUrl(category);
  navigate(`/services/${urlCategory}`, { state: { categories, services } });
  console.log('Learn more about product', category);
};




  const handleDelete = async (id) => {
    if (!window.confirm("Удалить этот сервис?")) return;

    try {
      const res = await fetch(`/api/Services/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Ошибка удаления");

      fetchServices(); 
    } catch (err) {
      console.error("Ошибка при удалении:", err);
    }
  };

    const handleEdit = (service) => {
    setEditingService(service);
    
    console.log("Редактирование:", service);
  };



  const filteredServices =
    selectedCategory && selectedCategory !== 'All'
      ? services.filter(item => item.category === selectedCategory)
      : services;

  return (
    <div>
      <div className='title-container'>
        <h3 className='title'>Our Services</h3>
        <div className='bottom-line'></div>
      </div>

      {isMain && (
        <BtnList
          type_list={categories}
          onSelect={setSelectedCategory}
        />
      )}

      <CardList
        products={filteredServices}
        onLearnMore={handleLearnMore}
         onDelete={handleDelete}
        onEdit={handleEdit}
      />

       {/* Модальное окно редактирования */}
      {editingService && (
  <EditServiceModal
    service={editingService }
    onClose={() => setEditingService(null)}
    onSave={fetchServices}
  />
)}
    </div>
  );
};

export default Services;

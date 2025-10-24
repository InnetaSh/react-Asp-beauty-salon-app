import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCategoryToUrl } from '../../utils/urlHelpers';
import CardList from '../ui/card-list';
import BtnList from '../ui/btn-list';
import EditSubServiceModal from '../modals/EditSubServiceModal';
import AddSubServiceModal from '../modals/AddSubServiceModal';

const Services = ({ isMain, onLearnMore }) => {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingService, setEditingService] = useState(null);
  const [addService, setAddService] = useState(false);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();

      const filtered = isMain ? data.filter(s => s.topService) : data;
      setServices(filtered);

      const uniqueCategories = ['All', ...new Set(filtered.map(s => s.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error('Ошибка загрузки:', err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [isMain]);


  const subService =
    services.flatMap(service => service.subServices || []) || [];
    console.log("SubServices get",subService)


  const handleSubCategory = (subService) => {
    const urlSubCategory = formatCategoryToUrl(subService);
    navigate(`/services/sub/${urlSubCategory}`, {
      state: { categories, services }
    });
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Удалить этот сервис?")) return;

    try {
      const res = await fetch(`/api/Services/subservice/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Ошибка удаления");

      await fetchServices();
    } catch (err) {
      console.error("Ошибка при удалении:", err);
    }
  };


  const handleEdit = (service) => {
    setEditingService(service);
  };


  const handleAdd = () => {
    setAddService(true);
    console.log("Add: service");
  };


  const filteredServices =
    selectedCategory !== 'All'
      ? services.filter(item => item.category === selectedCategory)
      : services;

  return (
    <div>
 
      {isMain && (
        <BtnList
          type_list={categories}
          onSelect={setSelectedCategory}
        />
      )}

 
      <CardList
        products={isMain ? filteredServices : subService}
        onLearnMore={handleSubCategory}
        onDelete={handleDelete}
        onEdit={handleEdit}
        learnMoreKey={isMain ? 'category' : 'title'}
        onAdd = {handleAdd}
      />


      {editingService && (
        <EditSubServiceModal
          service={editingService}
          onClose={() => setEditingService(null)}
          onSave={fetchServices}
        />
      )}

      
      {addService && (
        <AddSubServiceModal
          onClose={() => setAddService(false)}
          onSave={fetchServices}
        />
      )}
    </div>
  );
};

export default Services;

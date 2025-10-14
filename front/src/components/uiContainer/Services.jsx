import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCategoryToUrl } from '../../utils/urlHelpers';
import CardList from '../ui/card-list';
import BtnList from '../ui/btn-list';

const Services = ({ flag: isMain }) => {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); // по умолчанию All

  useEffect(() => {
    const url = '/api/services' ;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      // Если flag true — фильтруем, иначе берем все
      const filteredServices = isMain ? data.filter(item => item.topService === true) : data;
      setServices(filteredServices);

      const uniqueCategories = ['All', ...new Set(filteredServices.map(item => item.category))];
      setCategories(uniqueCategories);
      console.log('Загруженные сервисы:', filteredServices);
    })
    .catch(err => console.error('Ошибка при загрузке сервисов:', err));
}, [isMain]);



const handleLearnMore = (category) => {
  const urlCategory = formatCategoryToUrl(category);
  navigate(`/services/${urlCategory}`, { state: { categories, services } });
  console.log('Learn more about product', category);
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
      />
    </div>
  );
};

export default Services;

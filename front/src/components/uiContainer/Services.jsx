import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardList from '../ui/card-list';
import BtnList from '../ui/btn-list';

const Services = ({ flag }) => {
    const navigate = useNavigate();
    
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); // по умолчанию All

  useEffect(() => {
    fetch('/api/UI/services')
      .then(res => res.json())
      .then(data => {
        setServices(data);

        const uniqueCategories = ['All', ...new Set(data.map(item => item.category))];
        setCategories(uniqueCategories);
        console.log('uniqueCategories', uniqueCategories);
      });
  }, []);

  const handleLearnMore = (id) => {
     navigate(`/services/${id}`);
    console.log('Learn more about product', id);
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

      {flag && (
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

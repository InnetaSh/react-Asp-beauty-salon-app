import React, { useEffect, useState } from 'react';
import HeaderItem from '../ui/header-item';
import '../../index.css'

const Header = () => {
  const [topServices, setTopServices] = useState([]);
 
  useEffect(() => {
  fetch('/api/UI/top-services')
    .then(res => {
      console.log('Ответ от сервера:', res);
      return res.json();
    })
    .then(data => {
      console.log('Получили данные:', data);
      setTopServices(data);
    })
    .catch(err => console.error('Ошибка при загрузке:', err));
}, []);

console.log(topServices);
  const handleLearnMore = (id) => {
    console.log('Learn more about topServices', id);
    
  };

  return <HeaderItem bunners={topServices} onLearnMore={handleLearnMore} />;
};

export default Header;

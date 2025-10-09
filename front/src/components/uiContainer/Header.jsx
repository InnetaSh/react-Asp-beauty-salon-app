import React, { useEffect, useState } from 'react';
import HeaderComponent from '../ui/header-component';

import '../../index.css'

const menu_list = [
  { title: 'home', path: '/' },
  { title: 'services', path: '/services' },
  { title: 'shop', path: '/products' },
  { title: 'Blog', path: '/reviews' },
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' }
];

const Header = () => {
  const [topServices, setTopServices] = useState([]);
   const [name, setName] = useState("");

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

useEffect(() => {
    fetch('/api/UI/name')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setName(data[0].title);
        }
      });
  }, []);

console.log(topServices);
  const handleLearnMore = (id) => {
    console.log('Learn more about topServices', id);
    
  };

  return <HeaderComponent bunners={topServices} name = {name} menu_list={menu_list} onLearnMore={handleLearnMore} />;
};

export default Header;

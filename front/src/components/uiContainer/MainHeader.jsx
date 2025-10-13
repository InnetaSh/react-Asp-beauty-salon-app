import React, { useEffect, useState } from 'react';
import MainHeaderComponent from '../ui/main-header-component';

import '../../index.css'

const menu_list = [
  { title: 'home', path: '/' },
  { title: 'services', path: '/services' },
  { title: 'shop', path: '/products' },
  { title: 'Blog', path: '/reviews' },
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' }
];

const MainHeader = () => {
  const [bgHeader, setBgHeader] = useState([]);
   const [name, setName] = useState("");

  useEffect(() => {
  fetch('/api/UI/top-services')
    .then(res => {
      console.log('Ответ от сервера:', res);
      return res.json();
    })
    .then(data => {
      console.log('Получили данные:', data);
      setBgHeader(data);
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

console.log(bgHeader);
  const handleLearnMore = (id) => {
    console.log('Learn more about topServices', id);
    
  };

  return <MainHeaderComponent bunners={bgHeader} name = {name} menu_list={menu_list} onLearnMore={handleLearnMore} />;
};

export default MainHeader;

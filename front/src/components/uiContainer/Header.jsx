import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import HeaderComponent from '../ui/header-component';
import baseMenuList from '../../data/menu_list';
import '../../index.css'


const Header = ({ token, setToken }) => {
  const navigate = useNavigate();
  const [topServices, setTopServices] = useState([]);
  const [name, setName] = useState("");


  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate("/");
  };

  const menuItems = token
    ? [
      ...baseMenuList,
      { title: 'My Account', path: '/account' },
      { title: 'Exit', action: handleLogout }
    ]
    : [
      ...baseMenuList,
      { title: 'SignIn', path: '/login' }
    ];

  useEffect(() => {
    fetch('/api/UI/bgHeader')
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



  return <HeaderComponent bunners={topServices} name={name} menu_list={menuItems} onLearnMore={handleLearnMore} setToken ={setToken} />;
};

export default Header;

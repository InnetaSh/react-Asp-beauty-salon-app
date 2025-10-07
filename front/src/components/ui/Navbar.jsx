import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4">
      <Link className="navbar-brand" to="/">💇‍♀️ BeautySalon+</Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          {/* Публичные ссылки */}
          <li className="nav-item">
            <Link className="nav-link" to="/services">Услуги</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/products">Товары</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/reviews">Отзывы</Link>
          </li>
        </ul>

        <ul className="navbar-nav">
          {/* Если пользователь НЕ авторизован */}
          {!user && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Вход</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Регистрация</Link>
              </li>
            </>
          )}

          {/* Если пользователь авторизован (обычный пользователь) */}
          {user && user.role === 'user' && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/appointment/new">Запись</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/my-appointments">Мои записи</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Профиль</Link>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleLogout}>Выход</button>
              </li>
            </>
          )}

          {/* Если пользователь — администратор */}
          {user && user.role === 'admin' && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Админка</Link>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleLogout}>Выход</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

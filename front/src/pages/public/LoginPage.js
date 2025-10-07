//Форма входа
///login

// LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await login(email, password);

    if (res.success) {
      navigate('/');
    } else {
      setError(res.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-50 mx-auto mt-4">
      <h3>Вход</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label>Email</label>
        <input type="email" className="form-control" value={email}
               onChange={e => setEmail(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label>Пароль</label>
        <input type="password" className="form-control" value={password}
               onChange={e => setPassword(e.target.value)} required />
      </div>

      <button type="submit" className="btn btn-primary">Войти</button>
    </form>
  );
};

export default LoginForm;

import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_PORTF_URL}api/v1/token/`, {
        username,
        password,
      });
      const { access, refresh } = response.data;
      Cookies.set('access_token', access, { secure: true });
      Cookies.set('refresh_token', refresh, { secure: true });
    } catch (err) {
      setError('Ошибка при входе. Пожалуйста, проверьте ваше имя пользователя и пароль.');
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображаем сообщение об ошибке, если оно есть */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя пользователя:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button 
        type="submit" 
        onClick={handleSubmit}>Войти</button>
      </form>
    </div>
  );
};

export default LoginForm;

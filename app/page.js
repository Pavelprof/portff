import React, { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import PositionList from '../components/PositionList';
import { getToken, saveToken } from '../utils';
import { fetchPositions } from '../api';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [positions, setPositions] = useState([]);
  const [token, setToken] = useState(getToken());

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      saveToken(token);
      loadPositions();
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  const loadPositions = async () => {
    if (!token) return;
    
    try {
      const data = await fetchPositions(token);
      setPositions(data);
    } catch (error) {
      console.error("Failed to load positions:", error);
    }
  };

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  return (
    <div>
      {!isAuthenticated ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div>
          <h1>Your Positions</h1>
          <PositionList positions={positions} />
        </div>
      )}
    </div>
  );
}
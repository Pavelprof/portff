import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api/v1/';

export const authenticate = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}token/`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Error during authentication:', error);
    throw error;
  }
};

export const fetchPositions = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}position/?settlement_currency=RUB`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching positions:', error);
    throw error;
  }
};

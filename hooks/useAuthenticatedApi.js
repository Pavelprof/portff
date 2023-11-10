'use client'

import { useSession, signIn  } from 'next-auth/react';
import axios from 'axios';

export const useAuthenticatedApi = () => {
  const { data: session } = useSession();

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_PORTF_URL,
  });

  api.interceptors.request.use((config) => {
    if (session) {
      config.headers['Authorization'] = `Bearer ${session.user.accessToken}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(session)
      if (error.response && error.response.status === 401) {
        signIn();
      } else if (!error.response) {
        throw new Error('Network response was not ok');
      }
      return Promise.reject(error);
    }
  );

  return api;
};

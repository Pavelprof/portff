import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from '@mui/material';
import { authenticate } from '../api';
import { useRouter } from 'next/router';

export const LoginForm = () => {
  const router = useRouter();
  router.push('/positions');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    try {
      const data = await authenticate(username, password);
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      setErrorMsg("");
      console.log("Успешная авторизация!", data);
      navigate('/positions');
    } catch (error) {
      setErrorMsg(error.response.data.detail);
      console.log("Ошибка авторизации", error);
    }
  };

  return (
    <Grid container style={{ minHeight: '100vh' }}>
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <form>
          <div style={{ marginBottom: '10px' }}>
            <TextField label="Username" fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
          {errorMsg && (
            <Typography variant="body2" style={{ color: 'red', marginTop: '10px' }}>
              {errorMsg}
            </Typography>
          )}
        </form>
      </Grid>
    </Grid>
  );
};

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import api from '../api';
import logoImage from '../assets/images/logo.png'
import { styled } from '@mui/system'
import { TypographyProps } from '@mui/material/Typography';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
} from '@mui/material';


const StyledTypography = styled(Typography)<TypographyProps>({
  color: '#FFDD55',
  fontFamily: "'Lato', sans-serif !important",
  fontWeight: 500,
  letterSpacing: '0.1em',
  textShadow: '1px 1px 3px rgba(0, 0, 0, 0)',
});

const Login: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/api/auth/login', { userId, password });
      const { token, user } = response.data as { token: string; user: any };
      login(token, user);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'ログインに失敗しました');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 16,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <img
            src={logoImage}
            alt="Logo"
            style={{
              height: '70px',
              width: 'auto',
              marginRight: '16px'
            }}
          />
          <StyledTypography
            variant="h3"
            component="h1"
            className="app-title"
            sx={{
              fontSize: { xs: '1.5rem', sm: '3rem' },
              transition: 'color 0.3s ease',
              '&:hover': {
                color: '#FFE477'
              }
            }}
          >
            himawari
          </StyledTypography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userId"
            label="ログインID"
            name="userId"
            autoComplete="username"
            autoFocus
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#FFDD55'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FFA07A'
                }
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#FFA07A'
              }
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#FFD700'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FFA07A'
                }
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#FFA07A'
              }
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              fontWeight: 'bold',
              boxShadow: 'none',
              background: 'linear-gradient(45deg, #FF8E53 30%, #FFDD55 90%)',
              '&:hover': {
                transform: 'scale(1.02)',
                transition: 'transform 0.2s',
                boxShadow: 'none',
                background: 'linear-gradient(45deg, #FF8E53 30%, #FFDD55 90%)'
              }
            }}
          >
            ログイン
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
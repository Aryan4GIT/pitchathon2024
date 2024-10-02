import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';
import { auth } from '../../firebaseConfig.js'; 
import toast from 'react-hot-toast'

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // For registration
  const [username, setUsername] = useState(''); // For registration
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful');
      navigate('/home');
    } catch (error) {
      console.error('Login Error:', error.code, error.message);
      toast.error("error")
      handleAuthError(error.code);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setError('Invalid email format.');
      return;
    }
    if (password.length < 6) {
      setError('Password should be at least 6 characters long.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: `${name} (${username})` });

      alert('Registration successful! Logging in...');
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.error('Registration Error:', error.code, error.message);
      handleAuthError(error.code);
    }
  };

  const handleAuthError = (errorCode) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        setError('This email is already in use.');
        break;
      case 'auth/invalid-email':
        setError('Invalid email format.');
        break;
      case 'auth/weak-password':
        setError('Password should be at least 6 characters long.');
        break;
      case 'auth/invalid-email':
        setError('Invalid email format.');
        break;
      case 'auth/user-not-found':
        setError('No account found with this email.');
        break;
      case 'auth/wrong-password':
        setError('Incorrect password.');
        break;
      default:
        setError('Failed to login. Please check your credentials.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: '80px',
          padding: '20px',
          textAlign: 'center',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h4" gutterBottom>
          {isRegistering ? 'Register' : 'Login'}
        </Typography>

        {error && (
          <Typography color="error" paragraph>
            {error}
          </Typography>
        )}

        {isRegistering ? (
          <form onSubmit={handleRegister}>
            <Box mb={3}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Box>
            <Box mb={3}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Box>
            <Box mb={3}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Box>
            <Box mb={3}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Box>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
            <Typography variant="body2" color="textSecondary" mt={2}>
              Already have an account?{' '}
              <Box display="flex" justifyContent="center" mt={1}>
                <Button
                  onClick={() => {
                    setIsRegistering(false);
                    setError('');
                  }}
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
              </Box>
            </Typography>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <Box mb={3}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Box>
            <Box mb={3}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Box>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
            <Typography variant="body2" color="textSecondary" mt={2}>
              Don't have an account?{' '}
              <Box display="flex" justifyContent="center" mt={1}>
                <Button
                  onClick={() => {
                    setIsRegistering(true);
                    setError('');
                  }}
                  variant="contained"
                  color="primary"
                >
                  Register
                </Button>
              </Box>
            </Typography>
          </form>
        )}
      </Box>
    </Container>
  );
};

export default Login;

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ThankYouPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
      padding="20px"
      backgroundColor="#f5f5f5"
    >
      <Typography variant="h4" gutterBottom>
        Thank You for Applying!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Your application has been received. We will review it and get back to you shortly.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleBackToHome}
        sx={{ marginTop: '20px' }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default ThankYouPage;

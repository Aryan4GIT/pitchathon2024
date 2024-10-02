import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Box, TextField, Button, Typography } from '@mui/material';

const CCForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    problemDescription: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        'service_eg0d54w',
        'template_5t7p52z',
        {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNo: formData.phoneNo,
            problemDescription: formData.problemDescription,
            email: formData.email,
        },
        'r3k8fdsQhvDYWwPNh'
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          alert('Your message has been sent successfully!');
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phoneNo: '',
            problemDescription: '',
          });
        },
        (error) => {
          console.log('FAILED...', error);
          alert('There was an issue sending your message.');
        }
      );
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
        marginTop: '80px',
      }}
    >
      <Typography variant="h4" mb={4} align="center">
        Customer Care Form
      </Typography>

      <TextField
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        type="email"
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Phone No."
        name="phoneNo"
        value={formData.phoneNo}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Problem Description"
        name="problemDescription"
        value={formData.problemDescription}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        required
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ marginTop: '20px', width: '100%' }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CCForm;

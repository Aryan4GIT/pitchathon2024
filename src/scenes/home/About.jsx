import React from 'react';
import { Box, Typography, Container, Grid, Avatar } from '@mui/material';
import { shades } from "../../theme";

const creators = [
  { name: 'Ananya Bhalotia', image: '/ananya.jpg' },
  { name: 'Tushar Noonia', image: '/tushar.jpg' },
  { name: 'Yashovardhan', image: '/yash.jpg' },
  { name: 'Utkarsh Pandey', image: '/utkarsh.jpg' },
  { name: 'Ishita Khare', image: '/ishita.jpg' },
  { name: 'Aryan Kumar Singh', image: '/aryan.jpg' },
];

const About = () => {
  return (
    <Container>
      <Box
        sx={{
          marginTop: '80px', // Space from the top
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom sx={{color: shades.secondary[500]}}>
          About Us
        </Typography>
        <Typography variant="h6" paragraph>
          Welcome to GAP STEALER, a platform dedicated to empowering small-time workers like maids, daily wage workers, cleaners, and more. Our mission is to connect these hardworking individuals with opportunities, providing them with a platform to showcase their skills and connect with potential employers.
        </Typography>
        <Typography variant="h6" paragraph>
          At GAP STEALER, we understand the challenges faced by small-time workers and aim to bridge the gap between them and employers. Our platform offers a user-friendly interface where workers can create profiles, list their services, and apply for job opportunities.
        </Typography>
        <Typography variant="h6" paragraph>
          We are committed to creating a supportive and inclusive community. Whether you are a worker looking for new opportunities or an employer seeking reliable help, GAP STEALER is here to assist you in every step of the way.
        </Typography>
        <Typography variant="h6" paragraph>
          Thank you for visiting our site. We look forward to helping you find the perfect match and supporting the growth of small-time workers.
        </Typography>
        
        {/* Images section */}
        <Box sx={{ marginTop: '40px' }}>
          <Typography variant="h4" gutterBottom>
            Meet the Creators
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {creators.map((creator, index) => (
              <Grid item key={index} xs={6} sm={4} md={2} textAlign="center">
                <Avatar
                  src={creator.image}
                  alt={creator.name}
                  sx={{
                    width: 100,
                    height: 100,
                    margin: '0 auto',
                    mb: 2,
                  }}
                />
                <Typography variant="h6">{creator.name}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default About;

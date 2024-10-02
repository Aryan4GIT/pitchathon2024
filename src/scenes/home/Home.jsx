import React, { useEffect, useState } from 'react';
import MainCarousel from './MainCarousel';
import ShoppingList from './ShoppingList';
import Subscribe from './Subscribe';
import Chatbot from './Chatbot';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button, Modal, Fade, Backdrop, CircularProgress, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig.js'; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [jobTypeFilter, setJobTypeFilter] = useState('All');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsCollection = collection(db, 'jobs');
        const jobsSnapshot = await getDocs(jobsCollection);
        const jobsList = jobsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(jobsList);
      } catch (error) {
        console.error('Error fetching jobs: ', error);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleOpenModal = (job) => {
    setSelectedJob(job);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleApply = (job) => {
    navigate("/checkout", { state: { job } });
  };

  const filteredJobs = jobs.filter((job) => jobTypeFilter === 'All' || job.jobType === jobTypeFilter);

  return (
    <div className="home">
      <MainCarousel />
      <ShoppingList />
      <Chatbot />

      <Box marginTop="40px" padding="0 20px">
        <Typography variant="h4" textAlign="center" margin="20px 0" style={{ fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif' }}>
          Available Jobs
        </Typography>

        <FormControl sx={{ minWidth: 150, marginBottom: 2 }}>
          <InputLabel>Filter by Job Type</InputLabel>
          <Select
            value={jobTypeFilter}
            onChange={(e) => setJobTypeFilter(e.target.value)}
            label="Filter by Job Type"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Technical">Technical</MenuItem>
            <MenuItem value="Non-Technical">Non-Technical</MenuItem>
            <MenuItem value="Unskilled">Unskilled</MenuItem>
          </Select>
        </FormControl>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography variant="h6" textAlign="center" color="error">{error}</Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredJobs.map((job) => (
              <Grid item xs={12} sm={6} md={4} key={job.id}>
                <Card
                  elevation={3}
                  onClick={() => handleOpenModal(job)}
                  sx={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
                      transform: 'translateY(-5px)',
                    },
                  }}
                >
                  {job.imageUrl && (
                    <CardMedia
                      component="img"
                      height="200" // Increased height for larger images
                      image={job.imageUrl}
                      alt={job.title}
                      sx={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                    />
                  )}
                  <CardContent sx={{ padding: '20px' }}>
                    <Typography variant="h6" component="div" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
                      {job.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ margin: '10px 0', fontFamily: 'Open Sans, sans-serif' }}>
                      {job.description.length > 100 ? `${job.description.substring(0, 97)}...` : job.description} {/* Shortened description */}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Modal for job details */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                borderRadius: '10px',
                boxShadow: 24,
                p: 4,
              }}
            >
              {selectedJob && (
                <>
                  <Typography variant="h5" component="div" sx={{ marginBottom: '15px' }}>
                    {selectedJob.title}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                    <strong>Description:</strong> {selectedJob.description}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                    <strong>Name:</strong> {selectedJob.name}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                    <strong>Salary:</strong> ₹{selectedJob.price}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                    <strong>Contact:</strong> {selectedJob.contact}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                    <strong>Job Type:</strong> {selectedJob.jobType}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleApply(selectedJob)}
                    sx={{
                      marginTop: '15px',
                      borderRadius: '25px',
                      padding: '10px 20px',
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: 'bold',
                    }}
                  >
                    Apply
                  </Button>
                </>
              )}
            </Box>
          </Fade>
        </Modal>
      </Box>
      <Subscribe />
    </div>
  );
};

export default Home;

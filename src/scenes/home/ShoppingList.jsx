import { useSelector } from "react-redux";
import { Box, Typography, Card, CardMedia, CardContent, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ShoppingList = () => {
  const jobs = useSelector((state) => state.jobs?.items || []); // Assuming you store jobs here
  const navigate = useNavigate();

  return (
    <Box p="20px">
      <Typography variant="h4" gutterBottom>
        Available Jobs
      </Typography>
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="20px">
        {jobs.map((job, index) => (
          <Card key={index}>
            <CardMedia
              component="img"
              height="140"
              image={job.imageUrl} // <-- Display job image
              alt={job.title}
            />
            <CardContent>
              <Typography variant="h5">{job.title}</Typography>
              <Typography>{job.description}</Typography>
              <Typography>Price: ₹{job.price}</Typography>
              <Typography>Contact: {job.contact}</Typography>
              <Typography>Type: {job.jobType}</Typography>
            </CardContent>
            <Button onClick={() => navigate(`/job-details/${job.id}`)}>View Details</Button>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;

import { Box, Typography, Button } from "@mui/material";

const Item = ({ item }) => {
  const { title, description, price, imageUrl, contact, jobType, name } = item;

  return (
    <Box sx={{ border: "1px solid #ddd", padding: "16px", marginBottom: "16px", borderRadius: "8px" }}>
      <img src={imageUrl} alt={title} style={{ width: "100%", borderRadius: "8px" }} />
      <Typography variant="h5" component="h3" sx={{ mt: 2 }}>{title}</Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>{description}</Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>Contact: {contact}</Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>Type: {jobType}</Typography>
      <Typography variant="h6" sx={{ mt: 1 }}>₹{price}</Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>Posted by: {name}</Typography>
      <Button variant="contained" sx={{ mt: 2 }}>Apply Now</Button>
    </Box>
  );
};

export default Item;

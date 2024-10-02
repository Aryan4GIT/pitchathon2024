import { useState } from "react";
import { TextField, Box, Button, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig.js"; // Ensure firebase is correctly imported

const AddJobForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "", // Job description field
    name: "",
    price: "",
    contact: "",
    jobType: "",
    imageUrl: "", // New field for Image URL
  });

  const jobTypes = [
    { value: "Technical", label: "Technical" },
    { value: "Non-Technical", label: "Non-Technical" },
    { value: "Unskilled", label: "Unskilled" },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add the job details to Firebase Firestore, including imageUrl
      await addDoc(collection(db, "jobs"), {
        title: formData.title,
        description: formData.description, // Ensure description is included
        name: formData.name,
        price: Number(formData.price),
        contact: formData.contact,
        jobType: formData.jobType,
        imageUrl: formData.imageUrl, // Store the image URL
      });
      alert("Job added successfully!");
      navigate("/home"); // Redirect to home page after successful submission
    } catch (error) {
      console.error("Error adding job: ", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      gap="20px"
      maxWidth="500px"
      margin="auto"
      mt="50px"
      p="20px"
      boxShadow="0px 4px 10px rgba(0,0,0,0.1)"
    >
      <TextField
        label="Job Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <TextField
        label="Job Description"
        name="description" // Field for job description
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
        required
      />
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextField
        label="Price"
        name="price"
        value={formData.price}
        onChange={handleChange}
        type="number"
        required
      />
      <TextField
        label="Contact"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        required
      />
      <TextField
        select
        label="Job Type"
        name="jobType"
        value={formData.jobType}
        onChange={handleChange}
        required
      >
        {jobTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Image URL" // New field for Image URL
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Submit Job
      </Button>
    </Box>
  );
};

export default AddJobForm;

import React, { useState } from "react";
import { Box, Button, TextField, Snackbar } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

const EmployerForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = {
    employerName: "",
    email: "",
    phoneNumber: "",
    //jobTitle: "",
    negotiation: "", // for potential counter-offer or negotiation
  };

  const validationSchema = yup.object().shape({
    employerName: yup.string().required("Employee name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: yup.string().required("Phone number is required"),
    //jobTitle: yup.string().required("Job title is required"),
    negotiation: yup.string(),
  });

  const handleSubmit = (values, actions) => {
    // Here, you would typically send the employer details to your backend
    console.log("Employee Details Submitted:", values);
    actions.resetForm(); // Reset the form after submission
    // Show a success message (you can customize this as needed)
    setErrorMessage("Employee details submitted successfully!");
    actions.setTouched({});
  };

  return (
    <Box width="80%" m="100px auto">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Employee Name"
              name="employerName"
              value={values.employerName}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.employerName && Boolean(errors.employerName)}
              helperText={touched.employerName && errors.employerName}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={values.phoneNumber}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.phoneNumber && Boolean(errors.phoneNumber)}
              helperText={touched.phoneNumber && errors.phoneNumber}
              fullWidth
              margin="normal"
              required
            />
            
            <TextField
              label="Negotiation/Counter Offer"
              name="negotiation"
              value={values.negotiation}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.negotiation && Boolean(errors.negotiation)}
              helperText={touched.negotiation && errors.negotiation}
              fullWidth
              margin="normal"
              multiline
              rows={1}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
            <Snackbar
              open={!!errorMessage}
              autoHideDuration={6000}
              onClose={() => setErrorMessage("")}
              message={errorMessage}
            />
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EmployerForm;

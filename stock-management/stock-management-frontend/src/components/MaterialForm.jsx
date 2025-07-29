import React, { useState } from "react";
import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import api from "../services/api";

const initialFormState = {
  date: "",
  purchaseNo: "",
  name: "",
  quantity: "",
  unit: "",
  note: "",
};

const MaterialForm = ({ refresh }) => {
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post("/api/materials", formData);
      setFormData(initialFormState);
      refresh(); // Refresh the list
    } catch (err) {
      alert("Failed to add material");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>Add Material</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Date" type="date" name="date" fullWidth InputLabelProps={{ shrink: true }} value={formData.date} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Purchase No" name="purchaseNo" fullWidth value={formData.purchaseNo} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Material Name" name="name" fullWidth value={formData.name} onChange={handleChange} required />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Quantity" name="quantity" type="number" fullWidth value={formData.quantity} onChange={handleChange} required />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Unit" name="unit" fullWidth value={formData.unit} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Note" name="note" fullWidth multiline rows={2} value={formData.note} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit" fullWidth>Add Material</Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default MaterialForm;

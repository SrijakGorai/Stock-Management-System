import { useState } from "react";
import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ username: "", password: "", role: "ROLE_USER" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      await api.post("/api/auth/register", form);
      alert("User registered");
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h5" mb={2}>Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="username" label="Username" fullWidth margin="normal" onChange={handleChange} required />
        <TextField name="password" type="password" label="Password" fullWidth margin="normal" onChange={handleChange} required />
        <TextField
          name="role"
          select
          label="Role"
          value={form.role}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="ROLE_USER">User</MenuItem>
          <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;

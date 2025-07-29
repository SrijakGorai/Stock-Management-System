import { useState } from "react";
import { Box, Button, TextField, Typography, Link as MuiLink } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { setToken, setRole, logout } from "../auth"; // ⬅ Add logout here

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
  try {
    const res = await api.post("/api/auth/login", credentials);
    if (res.data?.token && res.data?.role) {
      setToken(res.data.token);
      setRole(res.data.role);
      navigate("/dashboard");
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (err) {
    logout(); // Clear any bad/old token
    alert("Invalid credentials or token verification failed");
  }
};


  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h5" mb={2}>Login</Typography>
      <TextField name="username" label="Username" fullWidth margin="normal" onChange={handleChange} />
      <TextField name="password" label="Password" type="password" fullWidth margin="normal" onChange={handleChange} />
      <Button variant="contained" fullWidth onClick={handleLogin} sx={{ mt: 2 }}>
        Login
      </Button>

      <Typography mt={2} textAlign="center">
        Don't have an account?{" "}
        <MuiLink component={Link} to="/register" underline="hover">
          Register here
        </MuiLink>
      </Typography>
    </Box>
  );
};

export default Login;

import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Paper,
  useTheme,
} from "@mui/material";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "ROLE_USER",
  });
  const navigate = useNavigate();
  const theme = useTheme();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/register", form);
      alert("User registered successfully");
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          p: 2,
          position: "relative",
        }}
      >
        {/* Dark overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />

        {/* Glassmorphism Paper Form */}
        <Paper
          elevation={8}
          sx={{
            position: "relative",
            zIndex: 1,
            p: 4,
            maxWidth: 400,
            width: "100%",
            borderRadius: 3,
            backdropFilter: "blur(15px)",
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(0,0,0,0.3)"
                : "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700, color: "white" }}
          >
            Register
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              name="username"
              label="Username"
              fullWidth
              margin="normal"
              onChange={handleChange}
              required
              InputProps={{
                sx: {
                  backdropFilter: "blur(8px)",
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(255,255,255,0.25)",
                  borderRadius: 2,
                  color: "white",
                },
              }}
              InputLabelProps={{ style: { color: "white" } }}
            />

            <TextField
              name="password"
              type="password"
              label="Password"
              fullWidth
              margin="normal"
              onChange={handleChange}
              required
              InputProps={{
                sx: {
                  backdropFilter: "blur(8px)",
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(255,255,255,0.25)",
                  borderRadius: 2,
                  color: "white",
                },
              }}
              InputLabelProps={{ style: { color: "white" } }}
            />

            <TextField
              name="role"
              select
              label="Role"
              value={form.role}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{
                sx: {
                  backdropFilter: "blur(8px)",
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(255,255,255,0.25)",
                  borderRadius: 2,
                  color: "white",
                },
              }}
              InputLabelProps={{ style: { color: "white" } }}
            >
              <MenuItem value="ROLE_USER">User</MenuItem>
              <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
            </TextField>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 2,
                fontSize: "1rem",
                textTransform: "none",
                background:
                  "linear-gradient(135deg, rgba(0,123,255,0.8), rgba(0,200,255,0.8))",
                color: "#fff",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, rgba(0,123,255,1), rgba(0,200,255,1))",
                },
              }}
            >
              Register
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default Register;

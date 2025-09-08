import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
  Paper,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { setToken, setRole, logout } from "../auth";
import Navbar from "../components/Navbar";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const theme = useTheme();

  const handleChange = (e) => {
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
      logout();
      alert("Invalid credentials or token verification failed");
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
            Login
          </Typography>

          <TextField
            name="username"
            label="Username"
            fullWidth
            margin="normal"
            onChange={handleChange}
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
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            onChange={handleChange}
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

          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
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
            Login
          </Button>

          <Typography
            mt={2}
            textAlign="center"
            sx={{ color: "white", opacity: 0.9 }}
          >
            Don't have an account?{" "}
            <MuiLink
              component={Link}
              to="/register"
              underline="hover"
              sx={{ color: "#00bfff" }}
            >
              Register here
            </MuiLink>
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default Login;


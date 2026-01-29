import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Box, Paper, Typography, TextField, Button, Link as MuiLink } from "@mui/material";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [fadeIn, setFadeIn] = useState(false); // for animation
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100); // fade in effect
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    try {
      const res = await api.post("/api/auth/login", credentials);
      if (res.data?.token && res.data?.role) {
        login(res.data.token, res.data.role);
        navigate("/dashboard");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      alert("Invalid credentials or server error");
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/images/bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: -1,
            filter: "brightness(0.9)",
          },
        }}
      >
        <Paper
          sx={{
            p: 5,
            maxWidth: 400,
            width: "90%",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: 3,
            boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: "#fff",
            opacity: fadeIn ? 1 : 0,
            transform: fadeIn ? "translateY(0)" : "translateY(-20px)",
            transition: "all 0.8s ease-out",
          }}
        >
          <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: 600 }}>
            Welcome Back
          </Typography>

          <TextField
            name="username"
            label="Username"
            fullWidth
            onChange={handleChange}
            sx={{
              my: 2,
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: 1,
              input: { color: "#fff" },
              label: { color: "rgba(255,255,255,0.7)" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255,255,255,0.4)" },
                "&:hover fieldset": { borderColor: "#90caf9" },
                "&.Mui-focused fieldset": { borderColor: "#90caf9" },
              },
            }}
          />

          <TextField
            name="password"
            type="password"
            label="Password"
            fullWidth
            onChange={handleChange}
            sx={{
              my: 2,
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: 1,
              input: { color: "#fff" },
              label: { color: "rgba(255,255,255,0.7)" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255,255,255,0.4)" },
                "&:hover fieldset": { borderColor: "#90caf9" },
                "&.Mui-focused fieldset": { borderColor: "#90caf9" },
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{
              my: 3,
              backgroundColor: "rgba(144, 202, 249,0.6)",
              color: "#000",
              fontWeight: 600,
              "&:hover": { backgroundColor: "rgba(144, 202, 249,0.8)" },
              transition: "0.3s all",
            }}
          >
            Login
          </Button>

          <Typography align="center" sx={{ color: "#fff", fontSize: 14 }}>
            Don't have an account?{" "}
            <MuiLink component={Link} to="/register" sx={{ color: "#90caf9", fontWeight: 500 }}>
              Register
            </MuiLink>
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default Login;

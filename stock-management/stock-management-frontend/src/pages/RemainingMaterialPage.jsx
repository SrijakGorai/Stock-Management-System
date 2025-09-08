import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import Navbar from "../components/Navbar";
import RemainingMaterial from "../components/RemainingMaterial";

const RemainingMaterialPage = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          backgroundImage: `url("https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1950&q=80")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 6,
          pb: 8,
          px: 2,
          position: "relative",
        }}
      >
        {/* Dark overlay for readability */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.45)",
            zIndex: 0,
          }}
        />

        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {/* Header */}
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 3,
              backdropFilter: "blur(12px)",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              textAlign: "center",
              color: "white",
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Remaining Material Stock
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Overview of all materials added, issued, and remaining
            </Typography>
          </Paper>

          {/* Remaining Material Table/List */}
          <Paper
            elevation={4}
            sx={{
              p: 3,
              borderRadius: 3,
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              color: "white",
            }}
          >
            <RemainingMaterial />
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default RemainingMaterialPage;

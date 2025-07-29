import React from "react";
import { Container, Typography, Box } from "@mui/material";
import Navbar from "../components/Navbar";
import RemainingMaterial from "../components/RemainingMaterial";

const RemainingMaterialPage = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Remaining Material Stock
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Overview of all materials added, issued, and remaining
          </Typography>
        </Box>
        <RemainingMaterial />
      </Container>
    </>
  );
};

export default RemainingMaterialPage;

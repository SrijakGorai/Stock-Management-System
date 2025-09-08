import React from "react";
import Navbar from "../components/Navbar";
import MaterialForm from "../components/MaterialForm";
import { Box, Paper } from "@mui/material";

const AddMaterialPage = () => {
  const dummyRefresh = () => {}; // No need refresh here

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          p: 3,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            maxWidth: 600,
            width: "100%",
            backdropFilter: "blur(12px)",
            backgroundColor: "rgba(255, 255, 255, 0.85)", // works for light/dark
          }}
        >
          <MaterialForm refresh={dummyRefresh} />
        </Paper>
      </Box>
    </>
  );
};

export default AddMaterialPage;

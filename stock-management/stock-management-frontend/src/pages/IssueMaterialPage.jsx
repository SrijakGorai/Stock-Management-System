import React from "react";
import Navbar from "../components/Navbar";
import MaterialIssueForm from "../components/MaterialIssueForm";
import { Box, Container, Paper } from "@mui/material";

const IssueMaterialPage = () => {
  const dummyRefresh = () => {};

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          backgroundImage: `url("https://images.unsplash.com/photo-1521790361543-f645cf042ec4?auto=format&fit=crop&w=1950&q=80")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 4,
          pb: 6,
          px: 2,
          position: "relative",
        }}
      >
        {/* Overlay for readability */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)", // dark overlay
            zIndex: 0,
          }}
        />

        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Glassy form */}
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 3,
              backdropFilter: "blur(12px)",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <MaterialIssueForm refresh={dummyRefresh} />
          </Paper>

          {/* Example list container */}
          <Paper
            elevation={4}
            sx={{
              p: 3,
              borderRadius: 3,
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              color: "white",
              fontSize: "1rem",
            }}
          >
            {/* Replace with your actual list */}
            Issued Materials will be listed here...
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default IssueMaterialPage;

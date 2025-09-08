// src/components/Footer.jsx
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        textAlign: "center",
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="h6" color="text.primary" gutterBottom>
        Stock Management System
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Efficient. Reliable. Secure.
      </Typography>
      <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
        © {new Date().getFullYear()} Stock Management System. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;

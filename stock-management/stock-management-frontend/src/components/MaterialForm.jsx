import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  useTheme,
} from "@mui/material";
import api from "../services/api";

const initialFormState = {
  date: "",
  purchaseNo: "",
  name: "",
  quantity: "",
  unit: "",
  note: "",
};

const MaterialForm = ({ refresh }) => {
  const [formData, setFormData] = useState(initialFormState);
  const theme = useTheme();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/materials", formData);
      setFormData(initialFormState);
      refresh(); // Refresh the list
    } catch (err) {
      alert("Failed to add material");
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 3,
        backdropFilter: "blur(20px)", // stronger blur
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(0, 0, 0, 0.25)"
            : "rgba(255, 255, 255, 0.15)", // much lighter opacity
        border: "1px solid rgba(255, 255, 255, 0.4)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        sx={{
          fontWeight: 600,
          mb: 3,
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
        }}
      >
        ➕ Add New Material
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {[
            {
              name: "date",
              label: "Date",
              type: "date",
              half: true,
              props: { InputLabelProps: { shrink: true } },
            },
            { name: "purchaseNo", label: "Purchase No", half: true },
            { name: "name", label: "Material Name" },
            { name: "quantity", label: "Quantity", type: "number", half: true },
            { name: "unit", label: "Unit", half: true },
            { name: "note", label: "Note", multiline: true, rows: 2 },
          ].map((field, idx) => (
            <Grid item xs={12} sm={field.half ? 6 : 12} key={idx}>
              <TextField
                {...field.props}
                label={field.label}
                name={field.name}
                type={field.type || "text"}
                fullWidth
                value={formData[field.name]}
                onChange={handleChange}
                required={field.name !== "note"}
                multiline={field.multiline || false}
                rows={field.rows || 1}
                InputProps={{
                  sx: {
                    backdropFilter: "blur(10px)",
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(255, 255, 255, 0.25)",
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                py: 1.5,
                fontSize: "1rem",
                borderRadius: 2,
                textTransform: "none",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.3), rgba(0,123,255,0.5))",
                color: "#fff",
                backdropFilter: "blur(6px)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.4), rgba(0,123,255,0.7))",
                },
              }}
            >
              Add Material
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default MaterialForm;


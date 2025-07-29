import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import api from "../services/api";
import dayjs from "dayjs";

const MaterialIssueForm = ({ refresh }) => {
  const [formData, setFormData] = useState({
    issueDate: null,
    purchaseNo: "",
    name: "",
    quantity: "",
    note: ""
  });

  const [issuedMaterials, setIssuedMaterials] = useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDateChange = (newDate) => {
    setFormData((prev) => ({ ...prev, issueDate: newDate }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        issueDate: formData.issueDate ? formData.issueDate.format("YYYY-MM-DD") : null,
      };
      await api.post("/api/issue", dataToSend);
      alert("Material issued successfully");
      setFormData({
        issueDate: null,
        purchaseNo: "",
        name: "",
        quantity: "",
        note: ""
      });
      refresh && refresh();
      fetchIssuedMaterials();
    } catch (err) {
      alert("Failed to issue material");
    }
  };

  const fetchIssuedMaterials = async () => {
    try {
      const res = await api.get("/api/issue"); // assuming this endpoint returns all issued materials
      setIssuedMaterials(res.data);
    } catch (err) {
      console.error("Failed to fetch issued materials");
    }
  };

  useEffect(() => {
    fetchIssuedMaterials();
  }, []);

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 500,
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 4,
          p: 3,
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" align="center">Issue Material</Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Issue Date"
            value={formData.issueDate}
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField required {...params} fullWidth />
            )}
          />
        </LocalizationProvider>

        <TextField
          label="Purchase No"
          name="purchaseNo"
          value={formData.purchaseNo}
          onChange={handleChange}
          required
        />

        <TextField
          label="Material Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <TextField
          label="Quantity"
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <TextField
          label="Note"
          name="note"
          value={formData.note}
          onChange={handleChange}
          multiline
          rows={2}
        />

        <Button variant="contained" color="primary" type="submit">
          Issue Material
        </Button>
      </Box>

      <Box sx={{ mt: 5, width: "90%", mx: "auto" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Issued Materials List
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Purchase No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Note</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {issuedMaterials.map((material, index) => (
                <TableRow key={index}>
                  <TableCell>{material.issueDate}</TableCell>
                  <TableCell>{material.purchaseNo}</TableCell>
                  <TableCell>{material.name}</TableCell>
                  <TableCell>{material.quantity}</TableCell>
                  <TableCell>{material.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default MaterialIssueForm;

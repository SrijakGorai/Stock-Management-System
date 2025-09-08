import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  Box,
  Typography,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import api from "../services/api";

const Dashboard = () => {
  const [addedMaterials, setAddedMaterials] = useState([]);
  const [issuedMaterials, setIssuedMaterials] = useState([]);
  const [remainingMaterials, setRemainingMaterials] = useState([]);

  const fetchAllData = async () => {
    try {
      const [addedRes, issuedRes, remainingRes] = await Promise.all([
        api.get("/api/materials"),           // Added
        api.get("/api/issue"),               // Issued
        api.get("/api/materials/remaining"), // Remaining
      ]);
      setAddedMaterials(addedRes.data);
      setIssuedMaterials(issuedRes.data);
      setRemainingMaterials(remainingRes.data);
    } catch (err) {
      alert("Failed to fetch dashboard data.");
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const renderTable = (title, data, columns) => (
    <Box sx={{ my: 4 }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: "white", fontWeight: "bold", textShadow: "0 0 6px rgba(0,0,0,0.6)" }}
      >
        {title}
      </Typography>
      <Paper
        sx={{
          background: "rgba(0, 0, 0, 0.5)", // dark glass
          backdropFilter: "blur(12px)",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col, idx) => (
                <TableCell
                  key={idx}
                  sx={{
                    color: "white",
                    fontWeight: "600",
                    borderColor: "rgba(255,255,255,0.2)",
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" }, // hover effect
                }}
              >
                {columns.map((col, i) => (
                  <TableCell
                    key={i}
                    sx={{ color: "white", borderColor: "rgba(255,255,255,0.1)" }}
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );

  return (
    <>
      <Navbar />
      <Box
        sx={{
          p: 3,
          minHeight: "100vh",
          position: "relative",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Dark overlay to keep text visible */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.5)",
            zIndex: 0,
          }}
        />

        {/* Content goes above overlay */}
        <Box sx={{ position: "relative", zIndex: 1 }}>
          {renderTable("Added Materials", addedMaterials, [
            { key: "date", label: "Date", render: (val) => val?.slice(0, 10) },
            { key: "purchaseNo", label: "Purchase No" },
            { key: "name", label: "Name" },
            { key: "quantity", label: "Quantity" },
            { key: "unit", label: "Unit" },
            { key: "note", label: "Note" },
          ])}

          <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.3)" }} />

          {renderTable("Issued Materials", issuedMaterials, [
            { key: "issueDate", label: "Issue Date", render: (val) => val?.slice(0, 10) },
            { key: "purchaseNo", label: "Purchase No" },
            { key: "name", label: "Name" },
            { key: "quantity", label: "Quantity" },
            { key: "note", label: "Note" },
          ])}

          <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.3)" }} />

          {renderTable("Remaining Materials", remainingMaterials, [
            { key: "date", label: "Date", render: (val) => val?.slice(0, 10) },
            { key: "purchaseNo", label: "Purchase No" },
            { key: "name", label: "Name" },
            { key: "unit", label: "Unit" },
            { key: "note", label: "Note" },
            { key: "added", label: "Added" },
            { key: "issued", label: "Issued" },
            { key: "remaining", label: "Remaining" },
          ])}
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;

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
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col, idx) => (
                <TableCell key={idx}>{col.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx}>
                {columns.map((col, i) => (
                  <TableCell key={i}>
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
      <Box sx={{ p: 3 }}>
        {renderTable("Added Materials", addedMaterials, [
          { key: "date", label: "Date", render: (val) => val?.slice(0, 10) },
          { key: "purchaseNo", label: "Purchase No" },
          { key: "name", label: "Name" },
          { key: "quantity", label: "Quantity" },
          { key: "unit", label: "Unit" },
          { key: "note", label: "Note" },
        ])}

        <Divider sx={{ my: 4 }} />

        {renderTable("Issued Materials", issuedMaterials, [
          { key: "issueDate", label: "Issue Date", render: (val) => val?.slice(0, 10) },
          { key: "purchaseNo", label: "Purchase No" },
          { key: "name", label: "Name" },
          { key: "quantity", label: "Quantity" },
          { key: "note", label: "Note" },
        ])}

        <Divider sx={{ my: 4 }} />

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
    </>
  );
};

export default Dashboard;

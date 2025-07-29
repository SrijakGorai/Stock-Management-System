import React from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
} from "@mui/material";

const MaterialList = ({ materials }) => {
  return (
    <Box sx={{ mt: 5, width: "90%", mx: "auto" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Material Stock (Remaining)
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Purchase No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Total Quantity</TableCell>
              <TableCell>Issued Quantity</TableCell>
              <TableCell>Remaining Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map((material, index) => (
              <TableRow key={index}>
                <TableCell>{material.purchaseNo}</TableCell>
                <TableCell>{material.name}</TableCell>
                <TableCell>{material.totalQuantity}</TableCell>
                <TableCell>{material.issuedQuantity}</TableCell>
                <TableCell>{material.remainingQuantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MaterialList;

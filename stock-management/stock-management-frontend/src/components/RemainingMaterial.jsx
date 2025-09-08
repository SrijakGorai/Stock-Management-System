import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import api from "../services/api";

const RemainingMaterial = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get("/api/materials/remaining")
      .then((res) => setData(res.data))
      .catch(() => alert("Failed to fetch remaining materials"));
  }, []);

  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        align="center"
        sx={{ fontWeight: 600, color: "white", mb: 2 }}
      >
        Remaining Materials
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: 2,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Material
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Remaining Quantity
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((mat, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: "white" }}>{mat.name}</TableCell>
                  <TableCell sx={{ color: "white" }}>{mat.remaining}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={2}
                  align="center"
                  sx={{ color: "white", opacity: 0.7 }}
                >
                  No materials available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RemainingMaterial;

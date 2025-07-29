import React, { useEffect, useState } from "react";
import api from "../services/api";

const RemainingMaterial = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/api/materials/remaining")
      .then(res => setData(res.data))
      .catch(() => alert("Failed to fetch remaining materials"));
  }, []);

  return (
    <div>
      <h2>Remaining Materials</h2>
      <table>
        <thead>
          <tr>
            <th>Material</th>
            <th>Remaining Quantity</th>
          </tr>
        </thead>
        <tbody>
          {data.map((mat, index) => (
            <tr key={index}>
              <td>{mat.name}</td>
              <td>{mat.remaining}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RemainingMaterial;

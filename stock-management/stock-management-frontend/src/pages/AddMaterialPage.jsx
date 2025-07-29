import React from "react";
import Navbar from "../components/Navbar";
import MaterialForm from "../components/MaterialForm";

const AddMaterialPage = () => {
  const dummyRefresh = () => {}; // We can ignore refresh here
  return (
    <>
      <Navbar />
      <MaterialForm refresh={dummyRefresh} />
    </>
  );
};

export default AddMaterialPage;

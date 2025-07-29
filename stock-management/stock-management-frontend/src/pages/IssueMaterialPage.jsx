import React from "react";
import Navbar from "../components/Navbar";
import MaterialIssueForm from "../components/MaterialIssueForm";

const IssueMaterialPage = () => {
  const dummyRefresh = () => {};
  return (
    <>
      <Navbar />
      <MaterialIssueForm refresh={dummyRefresh} />
    </>
  );
};

export default IssueMaterialPage;

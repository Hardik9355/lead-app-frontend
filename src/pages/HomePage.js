import React from "react";
import Layout from "../components/Layout";
import CreateLead from "../components/CreateLead";

const HomePage = () => {
  return (
    <Layout>
      <h1>Welcome to the Lead application</h1>
      <CreateLead />
      {/* <Mo/> */}
    </Layout>
  );
};

export default HomePage;

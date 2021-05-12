import React, { Component } from "react";

import CreateRequest from "./adminRequestForm";

import Navbar from "./components/Navbar";
import Sidebar from "../src/components/AdminSidebar";

class AdminForm extends Component {
  render() {
    return (
      <>
        <CreateRequest />
        <Navbar />
        <Sidebar />
      </>
    );
  }
}

export default AdminForm;


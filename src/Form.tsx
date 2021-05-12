import React, { Component } from "react";
import CreateRequest from "./requestform";
import Navbar from "./components/Navbar";
import Sidebar from "./components/AdminSidebar";

class Form extends Component {
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

export default Form;

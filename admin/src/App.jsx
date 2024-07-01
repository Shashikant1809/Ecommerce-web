import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Admin from "./Pages/Admin/Admin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Admin />
    </div>
  );
};

export default App;

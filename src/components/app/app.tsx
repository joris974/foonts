import React from "react";
import Navbar from "./navbar";
import "./app.css";
import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="main-container">
      <CssBaseline />
      <Navbar />

      <div className="body-container">
        <Outlet />
      </div>

      <footer className="text-center">
        Designed and built by{" "}
        <a href="https://github.com/joris974">Joris Buchou</a>. ©2026
      </footer>
    </div>
  );
}

export default App;

import React from "react";
import Navbar from "./navbar";
import "./app.css";
import { CssBaseline } from "@mui/material";

type Props = {
  children?: any;
};

function App({ children }: Props) {
  return (
    <div className="main-container">
      <CssBaseline />
      <Navbar />

      <div className="body-container">{children}</div>

      <footer className="text-center">
        Designed and built by{" "}
        <a href="https://github.com/joris974">Joris Buchou</a>. ©2020
      </footer>
    </div>
  );
}

export default App;

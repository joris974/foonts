import React from "react";
import Navbar from "./navbar";
import "./app.css";
import { CssBaseline } from "@material-ui/core";

type Props = {
  children?: any;
};

class App extends React.Component<Props> {
  render() {
    const { children } = this.props;

    return (
      <div className="main-container">
        <CssBaseline />
        <Navbar />

        <div className="body-container">{children}</div>

        <footer className="text-center">
          Designed and built by{" "}
          <a href="https://github.com/joris974">Joris Buchou</a>. ©2017
        </footer>
      </div>
    );
  }
}

export default App;

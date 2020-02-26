import React, { ReactNode } from "react";

import { loadFonts } from "../helpers/api";
import Navbar from "./navbar";
import Spinner from "./spinner";
import { Font } from "./fonts-page/font-list-item";

interface Props {
  children: ReactNode;
}

interface State {
  fontList: Font[];
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { fontList: [] };
  }

  componentDidMount() {
    loadFonts().then(fontList => {
      this.setState({ fontList });
    });
  }

  render() {
    const { fontList } = this.state;

    const children =
      this.props.children && fontList.length > 0 ? (
        React.cloneElement(this.props.children, { fontList })
      ) : (
        <Spinner />
      );

    return (
      <div className="main-container">
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

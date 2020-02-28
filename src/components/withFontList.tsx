import React from "react";
import { Subtract } from "utility-types";
import { Font } from "../types/font";
import { loadFonts } from "../helpers/api";
import Spinner from "./spinner";

export type Props = {
  fontList: Font[];
};

type State = {
  fontList: Font[];
};

export function withFontList<P extends Props>(
  Component: React.ComponentType<P>
) {
  return class WithFontList extends React.Component<Subtract<P, Props>, State> {
    constructor(props: Subtract<P, Props>) {
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
      if (fontList.length === 0) {
        return <Spinner />;
      }

      return <Component {...(this.props as P)} fontList={fontList} />;
    }
  };
}

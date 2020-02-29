import React from "react";
import ExplorePage from "./explore-container";
import Spinner from "../../common/spinner";
import { Font } from "../../../types/font";
import { FontPairing } from "../../../types/font-pairing";

type Props = {
  fontList: Font[];
  loadFontPairings: () => any;
};

type State = {
  fontPairings: FontPairing[];
};

class ExploreHandler extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { fontPairings: [] };
  }

  componentDidMount() {
    const { loadFontPairings } = this.props;

    loadFontPairings().then((fontPairings: FontPairing[]) => {
      this.setState({ fontPairings });
    });
  }

  render() {
    const { fontPairings } = this.state;
    const { fontList } = this.props;

    return fontPairings.length > 0 ? (
      <ExplorePage fontList={fontList} fontPairings={fontPairings} />
    ) : (
      <Spinner />
    );
  }
}

export default ExploreHandler;

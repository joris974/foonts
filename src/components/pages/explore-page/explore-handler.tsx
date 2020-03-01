import React from "react";
import ExplorePage from "./explore-container";
import { Font } from "../../../types/font";
import { FontPairing } from "../../../types/font-pairing";
import Spinner from "../../common/spinner";

type Props = {
  fontList: Font[];
  loadFontPairings: () => any;
  sortedBy: "recent" | "popular";
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
    const { fontList, sortedBy } = this.props;
    const { fontPairings } = this.state;

    return fontPairings.length > 0 ? (
      <ExplorePage
        fontList={fontList}
        fontPairings={fontPairings}
        sortedBy={sortedBy}
      />
    ) : (
      <Spinner />
    );
  }
}

export default ExploreHandler;

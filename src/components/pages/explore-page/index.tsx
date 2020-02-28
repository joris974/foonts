import React from "react";
import ExplorePage from "./explore-page";
import { loadRecentFontPairings } from "./../../../helpers/api";
import Spinner from "./../../spinner";
import { Font } from "../../../types/font";
import { withFontList } from "./../../withFontList";
import { FontPairing } from "../../../types/font-pairing";

type Props = {
  fontList: Font[];
};

type State = {
  recentFontPairings: FontPairing[];
};

class ExploreRecentPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { recentFontPairings: [] };
  }

  componentDidMount() {
    loadRecentFontPairings().then((recentFontPairings: FontPairing[]) => {
      this.setState({ recentFontPairings });
    });
  }

  render() {
    const { recentFontPairings } = this.state;
    const { fontList } = this.props;

    return recentFontPairings.length > 0 ? (
      <ExplorePage fontList={fontList} fontPairings={recentFontPairings} />
    ) : (
      <Spinner />
    );
  }
}

export default withFontList(ExploreRecentPage);

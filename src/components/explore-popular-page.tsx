import React from "react";
import ExplorePage from "./explore-page";
import { loadPopularFontPairings } from "../helpers/api";
import Spinner from "./spinner";
import { Font } from "./fonts-page/font-list-item";
import { withFontList } from "./withFontList";

type Props = {
  fontList: Font[];
};

type State = {
  recentFontPairings: any;
};

class ExplorePopularPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { recentFontPairings: [] };
  }

  componentDidMount() {
    loadPopularFontPairings().then(recentFontPairings => {
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

export default withFontList(ExplorePopularPage);

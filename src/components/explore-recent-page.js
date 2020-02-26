import React from "react";
import ExplorePage from "./explore-page";
import { loadRecentFontPairings } from "./../helpers/api";
import Spinner from "./spinner";

class ExploreRecentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recentFontPairings: [] };
  }

  componentDidMount() {
    loadRecentFontPairings().then(recentFontPairings => {
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

export default ExploreRecentPage;

import React from "react";
import ExplorePage from "./explore-page.js";
import { loadPopularFontPairings } from "./../helpers/api";
import Spinner from "./spinner.js";

class ExplorePopularPage extends React.Component {
  constructor(props) {
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

export default ExplorePopularPage;

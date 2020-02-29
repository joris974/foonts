import React from "react";
import { Link } from "react-router-dom";
import take from "lodash/take";

import FontPairingItem from "./font-pairing-snippet";
import Spinner from "../../common/spinner";
import { Font } from "../../../types/font";
import { FontPairing } from "../../../types/font-pairing";
import { Grid, Container, Button } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

type Props = {
  fontList: Font[];
  fontPairings: FontPairing[];
};

type State = {
  numMaxVisible: number;
};

class ExploreContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { numMaxVisible: 12 };

    this.handleClickSeeMore = this.handleClickSeeMore.bind(this);
  }

  handleClickSeeMore() {
    this.setState({ numMaxVisible: this.state.numMaxVisible + 12 });
  }

  render() {
    const { fontList, fontPairings } = this.props;
    const { numMaxVisible } = this.state;

    const visibleFontPairings = take(fontPairings, numMaxVisible);

    const pairings = visibleFontPairings.map(pairing => {
      return (
        <Grid item xs={12} sm={6} md={3} key={pairing.id}>
          <FontPairingItem fontList={fontList} pairing={pairing} />
        </Grid>
      );
    });

    const btnSeeMore =
      numMaxVisible > fontPairings.length ? null : (
        <Grid container spacing={10}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Button
              color="primary"
              endIcon={<ExpandMoreIcon />}
              onClick={this.handleClickSeeMore}
            >
              See more
            </Button>
          </Grid>
        </Grid>
      );

    const pairingsNode =
      fontPairings.length > 0 ? (
        <>
          <Grid container spacing={4}>
            {pairings}
          </Grid>
          {btnSeeMore}
        </>
      ) : (
        <Spinner />
      );

    return (
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Link to="/explore/recent">Recent</Link>&nbsp;|&nbsp;
            <Link to="/explore/popular">Popular</Link>
          </Grid>
        </Grid>
        {pairingsNode}
      </Container>
    );
  }
}

export default ExploreContainer;

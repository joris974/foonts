import React, { useState } from "react";
import FontPairingItem from "./font-pairing-snippet";
import Spinner from "../../common/spinner";
import { Font } from "../../../types/font";
import { FontPairing } from "../../../types/font-pairing";
import { Grid, Container, Button, Paper } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SortListFilter from "./sort-list-filter";

type Props = {
  fontList: Font[];
  fontPairings: FontPairing[];
  sortedBy: "recent" | "popular";
};

function ExploreContainer({ fontList, fontPairings, sortedBy }: Props) {
  const [numMaxVisible, setNumMaxVisible] = useState(12);
  const handleClickSeeMore = () => setNumMaxVisible((current) => current + 12);

  const visibleFontPairings = fontPairings.slice(0, numMaxVisible);

  const pairings = visibleFontPairings.map((pairing) => {
    return (
      <Grid size={{ xs: 12, sm: 6, md: 3 }} key={pairing.id}>
        <FontPairingItem fontList={fontList} pairing={pairing} />
      </Grid>
    );
  });

  const btnSeeMore =
    numMaxVisible > fontPairings.length ? null : (
      <Grid container spacing={10}>
        <Grid size={12} style={{ textAlign: "center" }}>
          <Button
            color="primary"
            endIcon={<ExpandMoreIcon />}
            onClick={handleClickSeeMore}
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
      <Paper style={{ margin: "16px 0", padding: "16px" }}>
        <Grid container spacing={4}>
          <Grid size={12} style={{ textAlign: "center" }}>
            <SortListFilter sortedBy={sortedBy} />
          </Grid>
        </Grid>
      </Paper>
      {pairingsNode}
    </Container>
  );
}

export default ExploreContainer;

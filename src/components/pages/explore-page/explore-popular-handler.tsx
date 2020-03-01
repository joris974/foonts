import React from "react";
import { loadPopularFontPairings } from "../../../helpers/api";
import { Font } from "../../../types/font";
import { withFontList } from "../../withFontList";
import ExploreHandler from "./explore-handler";

type Props = {
  fontList: Font[];
};

function ExplorePopularHandler(props: Props) {
  const { fontList } = props;
  return (
    <ExploreHandler
      fontList={fontList}
      loadFontPairings={loadPopularFontPairings}
      sortedBy="popular"
    />
  );
}

export default withFontList(ExplorePopularHandler);

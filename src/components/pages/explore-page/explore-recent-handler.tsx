import React from "react";
import { loadRecentFontPairings } from "./../../../helpers/api";
import { Font } from "../../../types/font";
import { withFontList } from "./../../withFontList";
import ExploreHandler from "./explore-handler";

type Props = {
  fontList: Font[];
};

function ExploreRecentHandler(props: Props) {
  const { fontList } = props;
  return (
    <ExploreHandler
      fontList={fontList}
      loadFontPairings={loadRecentFontPairings}
    />
  );
}

export default withFontList(ExploreRecentHandler);

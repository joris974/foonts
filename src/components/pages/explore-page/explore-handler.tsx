import React, { useEffect, useState } from "react";
import ExplorePage from "./explore-container";
import { Font } from "../../../types/font";
import { FontPairing } from "../../../types/font-pairing";
import Spinner from "../../common/spinner";

type Props = {
  fontList: Font[];
  loadFontPairings: () => any;
  sortedBy: "recent" | "popular";
};

function ExploreHandler({ fontList, loadFontPairings, sortedBy }: Props) {
  const [fontPairings, setFontPairings] = useState<FontPairing[]>([]);

  useEffect(() => {
    let isCurrent = true;

    loadFontPairings().then((pairings: FontPairing[]) => {
      if (isCurrent) {
        setFontPairings(pairings);
      }
    });

    return () => {
      isCurrent = false;
    };
  }, [loadFontPairings]);

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

export default ExploreHandler;

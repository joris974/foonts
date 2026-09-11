import React, { useEffect, useState } from "react";
import ExplorePage from "./explore-container";
import { Font } from "../../../types/font";
import { FontPairing } from "../../../types/font-pairing";
import LoadError from "../../common/load-error";
import Spinner from "../../common/spinner";

type Props = {
  fontList: Font[];
  loadFontPairings: () => Promise<FontPairing[]>;
  sortedBy: "recent" | "popular";
};

function ExploreHandler({ fontList, loadFontPairings, sortedBy }: Props) {
  const [fontPairings, setFontPairings] = useState<FontPairing[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isCurrent = true;
    setError(null);

    loadFontPairings()
      .then((pairings: FontPairing[]) => {
        if (isCurrent) {
          setFontPairings(pairings);
        }
      })
      .catch((loadError: Error) => {
        if (isCurrent) {
          setError(loadError);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [loadFontPairings, retryCount]);

  if (error) {
    return (
      <LoadError
        message="We couldn't load the font pairings."
        onRetry={() => setRetryCount((current) => current + 1)}
      />
    );
  }

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

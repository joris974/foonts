import React, { useEffect, useState } from "react";
import { Font } from "../types/font";
import { loadFonts } from "../helpers/api";
import LoadError from "./common/load-error";
import Spinner from "./common/spinner";

export type Props = {
  fontList: Font[];
};

export function withFontList<P extends Props>(
  Component: React.ComponentType<P>,
) {
  type PropsWithoutFontList = Omit<P, keyof Props>;

  return function WithFontList(props: PropsWithoutFontList) {
    const [fontList, setFontList] = useState<Font[] | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
      let isCurrent = true;
      setError(null);
      loadFonts()
        .then((loadedFonts) => {
          if (isCurrent) {
            setFontList(loadedFonts);
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
    }, [retryCount]);

    if (error) {
      return (
        <LoadError
          message="We couldn't load the font list."
          onRetry={() => setRetryCount((current) => current + 1)}
        />
      );
    }

    if (fontList === null) {
      return <Spinner />;
    }

    return <Component {...(props as P)} fontList={fontList} />;
  };
}

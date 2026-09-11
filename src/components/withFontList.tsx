import React, { useEffect, useState } from "react";
import { Font } from "../types/font";
import { loadFonts } from "../helpers/api";
import Spinner from "./common/spinner";

export type Props = {
  fontList: Font[];
};

export function withFontList<P extends Props>(
  Component: React.ComponentType<P>,
) {
  type PropsWithoutFontList = Omit<P, keyof Props>;

  return function WithFontList(props: PropsWithoutFontList) {
    const [fontList, setFontList] = useState<Font[]>([]);

    useEffect(() => {
      let isCurrent = true;
      loadFonts().then((loadedFonts) => {
        if (isCurrent) {
          setFontList(loadedFonts);
        }
      });

      return () => {
        isCurrent = false;
      };
    }, []);

    if (fontList.length === 0) {
      return <Spinner />;
    }

    return <Component {...(props as P)} fontList={fontList} />;
  };
}

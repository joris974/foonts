import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Font } from "../../../types/font";
import GeneratePageContainer from "./generate-page-container";
import {
  fontsToUrl,
  extractFromMatch,
  randomFonts,
} from "../../../helpers/helper";
import { sendFontPairingToApi } from "../../../helpers/api";
import Spinner from "../../common/spinner";
import { withFontList } from "../../withFontList";

type Props = {
  fontList: Font[];
};

function GeneratePageHandler(props: Props) {
  const { fontList } = props;
  const { fonts } = useParams<{ fonts?: string }>();
  const navigate = useNavigate();
  const fontsParams = extractFromMatch({ params: { fonts } }, fontList);
  const [titleFont, setTitleFont] = useState<Font | null | undefined>(
    fontsParams?.titleFont,
  );
  const [contentFont, setContentFont] = useState<Font | null | undefined>(
    fontsParams?.contentFont,
  );

  useEffect(() => {
    const currentFonts = extractFromMatch({ params: { fonts } }, fontList);

    if (currentFonts === null || currentFonts === undefined) {
      if (fontList.length > 0) {
        const [randTitleFont, randContentFont] = randomFonts(fontList, 2);
        const url = fontsToUrl(randTitleFont, randContentFont);
        navigate(url);
      }
    } else {
      setTitleFont(currentFonts.titleFont);
      setContentFont(currentFonts.contentFont);
      sendFontPairingToApi(currentFonts.titleFont, currentFonts.contentFont);
    }
  }, [fontList, fonts, navigate]);

  const updateFonts = (newTitleFont: Font, newContentFont: Font) => {
    const url = fontsToUrl(newTitleFont, newContentFont);
    navigate(url);
    setTitleFont(newTitleFont);
    setContentFont(newContentFont);
  };

  if (!titleFont || !contentFont) {
    return <Spinner />;
  }

  return (
    <GeneratePageContainer
      fontList={fontList}
      titleFont={titleFont}
      contentFont={contentFont}
      updateFonts={updateFonts}
    />
  );
}

export default withFontList(GeneratePageHandler);

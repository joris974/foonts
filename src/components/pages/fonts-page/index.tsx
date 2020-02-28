import React from "react";
import FontsPageContainer from "./fonts-page-container";
import { Font } from "../../../types/font";
import { withFontList } from "../../withFontList";

type Props = {
  fontList: Font[];
};

function FontsPageWrapper(props: Props) {
  const { fontList } = props;
  return <FontsPageContainer fontList={fontList} />;
}

export default withFontList(FontsPageWrapper);

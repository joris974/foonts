import React from "react";
import FontsPage from "./fonts-page";
import { Font } from "./font-list-item";
import { withFontList } from "../withFontList";

type Props = {
  fontList: Font[];
};

function FontsPageWrapper(props: Props) {
  const { fontList } = props;
  return <FontsPage fontList={fontList} />;
}

export default withFontList(FontsPageWrapper);

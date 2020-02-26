import React from "react";
import FontsPage from "./fonts-page";
import { Font } from "./font-list-item";

interface Props {
  fontList: Font[];
}

function FontsPageWrapper(props: Props) {
  const { fontList } = props;
  return <FontsPage fontList={fontList} />;
}

export default FontsPageWrapper;

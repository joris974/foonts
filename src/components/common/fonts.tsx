import React from "react";

type Props = {
  fontName: string;
  fontUrl: string;
};

function Fonts(props: Props) {
  const { fontName, fontUrl } = props;

  return <link rel="stylesheet" href={fontUrl} title={fontName} />;
}

export default Fonts;

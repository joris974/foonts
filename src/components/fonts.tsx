import React from "react";

interface Props {
  fontName: string;
  fontUrl: string;
}

function Fonts(props: Props) {
  const { fontName, fontUrl } = props;

  const toHttps = (st: string) => st.replace(/http:/g, "https:");

  const fontFace = `
      @font-face {
        font-family: '${fontName}';
        src: url('${toHttps(fontUrl)}');
      }`;

  return <style>{fontFace}</style>;
}

export default Fonts;

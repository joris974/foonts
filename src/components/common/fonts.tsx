import React, { useEffect } from "react";

type Props = {
  fontName: string;
  fontUrl: string;
};

function Fonts(props: Props) {
  const { fontName, fontUrl } = props;

  useEffect(() => {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = fontUrl;
    stylesheet.title = fontName;
    document.head.appendChild(stylesheet);

    return () => {
      stylesheet.remove();
    };
  }, [fontName, fontUrl]);

  return null;
}

export default Fonts;

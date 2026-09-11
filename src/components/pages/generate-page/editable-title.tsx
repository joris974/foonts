import React, { useState } from "react";
import { Font } from "../../../types/font";
import { FontProperties } from "../../../types/font-style";

const DefaultTitle = "Find best matching fonts in seconds!!";

type Props = {
  fontStyleProps: FontProperties;
  font: Font;
};

function EditableTitle({ fontStyleProps, font }: Props) {
  const [content, setContent] = useState(DefaultTitle);
  const { fontSize, fontWeight, fontStyle } = fontStyleProps;

  const style = {
    fontSize: `${fontSize}px`,
    fontWeight,
    fontStyle,
    fontFamily: font.family,
  };
  return (
    <h1
      style={style}
      contentEditable="true"
      className="editable editable-title"
      onInput={(event) => setContent(event.currentTarget.textContent || "")}
    >
      {content}
    </h1>
  );
}

export default EditableTitle;

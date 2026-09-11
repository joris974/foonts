import React, { useState } from "react";
import { Font } from "../../../types/font";
import { FontProperties } from "../../../types/font-style";

const DefaultContent = [
  ` Edit Me!`,
  `If I had a world of my own, everything would be nonsense.
    Nothing would be what it is, because everything would be what it isn't.
    And contrary wise, what is, it wouldn't be. And what it wouldn't be, it would. You see?
    `,
  `Sed scelerisque tristique nunc ac congue.
    Vivamus dolor risus, fringilla a nisl at, pellentesque mattis nisi.
    `,
  `Aliquam facilisis blandit elit nec tempor.
    Aenean commodo tortor ac justo ultrices, quis finibus diam tempus.
    Donec efficitur diam tellus, vitae varius diam euismod eu.
    Phasellus viverra tellus lacus.
    Nam quis ultrices libero.
    Ut pharetra, sem et tincidunt porttitor, felis urna tristique lacus, nec tincidunt nibh est et sapien.
    Vestibulum tempor nisi at congue sodales.
    `,
];

type Props = {
  fontStyleProps: FontProperties;
  font: Font;
};

function EditableContent({ fontStyleProps, font }: Props) {
  const [content, setContent] = useState(DefaultContent);
  const { fontSize, fontWeight, fontStyle } = fontStyleProps;

  const style = {
    fontSize: `${fontSize}px`,
    fontWeight,
    fontStyle,
    fontFamily: font.family,
  };

  const contentPs = content.map((line, i) => <p key={i}>{line}</p>);

  return (
    <div
      style={style}
      contentEditable="true"
      className="p editable editable-content"
      onInput={(event) => {
        const lines = (event.currentTarget.textContent || "").split("\n");
        setContent(lines);
      }}
    >
      {contentPs}
    </div>
  );
}

export default EditableContent;

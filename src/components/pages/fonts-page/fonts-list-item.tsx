import React from "react";
import Fonts from "../../common/fonts";
import { Font } from "../../../types/font";
import { Card, CardContent } from "@material-ui/core";

type Props = {
  font: Font;
};

function FontsListItem(props: Props) {
  const { font } = props;
  return (
    <>
      <Card>
        <CardContent>
          <h4>{font.family}</h4>
          <h2 style={{ fontFamily: font.family }}>
            The quick brown fox jumps over the lazy dog
          </h2>
        </CardContent>
      </Card>
      <Fonts key={font.family} fontName={font.family} fontUrl={font.url} />
    </>
  );
}

export default FontsListItem;

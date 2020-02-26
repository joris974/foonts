import React from "react";

import Fonts from "./../fonts";
import { Category } from "../../helpers/helper";

export type Font = {
  id: string;
  family: string;
  url: string;
  category: Category;
  num_liked: number;
};

type Props = {
  font: Font;
};

function FontListItem(props: Props) {
  const { font } = props;
  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="font-item">
          <Fonts key={font.family} fontName={font.family} fontUrl={font.url} />
          <h4>{font.family}</h4>
          <h3 className="h2" style={{ fontFamily: font.family }}>
            The quick brown fox jumps over the lazy dog
          </h3>
        </div>
      </div>
    </div>
  );
}

export default FontListItem;

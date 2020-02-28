import React from "react";
import Card from "react-bootstrap/Card";
import Fonts from "../../fonts";
import { Font } from "../../../types/font";
import "./font-list-item.css";

type Props = {
  font: Font;
};

function FontsListItem(props: Props) {
  const { font } = props;
  return (
    <>
      <Card className="font-card">
        <Card.Body>
          <Card.Title>{font.family}</Card.Title>
          <Card.Text>
            <h3 className="h2" style={{ fontFamily: font.family }}>
              The quick brown fox jumps over the lazy dog
            </h3>
          </Card.Text>
        </Card.Body>
      </Card>
      <Fonts key={font.family} fontName={font.family} fontUrl={font.url} />
    </>
  );
}

export default FontsListItem;

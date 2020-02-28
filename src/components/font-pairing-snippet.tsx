import React from "react";
import { Link } from "react-router-dom";
import Fonts from "./fonts";
import { fontsToSubUrl } from "./../helpers/helper";
import { Font } from "../types/font";
import Card from "react-bootstrap/Card";

type Props = {
  fontList: Font[];
  pairing: any;
};

function FontPairingItem(props: Props) {
  const { fontList, pairing } = props;
  const titleFont = fontList.find(font => font.id === pairing.font_title_id);
  const fontContent = fontList.find(
    font => font.id === pairing.font_content_id
  );

  if (
    titleFont === null ||
    titleFont === undefined ||
    fontContent === null ||
    fontContent === undefined
  ) {
    return null;
  }

  const fontFacesNode = [titleFont, fontContent].map((font: Font) => (
    <Fonts key={font.family} fontName={font.family} fontUrl={font.url} />
  ));

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title style={{ fontFamily: titleFont.family }}>
            {titleFont.family}
          </Card.Title>
          <Card.Text style={{ fontFamily: fontContent.family }}>
            {fontContent.family}

            <ul className="list-inline font-pairing-item-status">
              <li>
                <i className="fa fa-eye"></i> {pairing.num_views}
              </li>
              <li>
                <i className="fa fa-heart"></i> {pairing.num_liked}
              </li>
            </ul>
          </Card.Text>
          <Link to={fontsToSubUrl(titleFont, fontContent)}>View More</Link>
        </Card.Body>
      </Card>
      {fontFacesNode}
    </>
  );
}

export default FontPairingItem;

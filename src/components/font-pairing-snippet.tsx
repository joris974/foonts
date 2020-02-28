import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import Fonts from "./fonts";
import { fontsToSubUrl } from "./../helpers/helper";
import { Font } from "../types/font";

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

  const fontFacesNode = _.chain([titleFont, fontContent])
    .filter(x => x !== null && x !== undefined)
    .map((font: Font) => (
      <Fonts key={font.family} fontName={font.family} fontUrl={font.url} />
    ))
    .value();

  return (
    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 font-pairing-item-wrapper">
      <Link to={fontsToSubUrl(titleFont, fontContent)}>
        <div className="font-pairing-item">
          {fontFacesNode}
          <div className="row font-pairing-item-body">
            <div className="col-xs-12">
              <h3 style={{ fontFamily: titleFont.family }}>
                {titleFont.family}
              </h3>
              <p style={{ fontFamily: fontContent.family }}>
                {fontContent.family}
              </p>
            </div>
          </div>
          <div className="row text-right">
            <div className="col-xs-12">
              <ul className="list-inline font-pairing-item-status">
                <li>
                  <i className="fa fa-eye"></i> {pairing.num_views}
                </li>
                <li>
                  <i className="fa fa-heart"></i> {pairing.num_liked}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default FontPairingItem;

import React from "react";
import { Link } from "react-router-dom";
import Fonts from "../../../fonts";
import { fontsToSubUrl } from "../../../../helpers/helper";
import { Font } from "../../../../types/font";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import FavoriteIcon from "@material-ui/icons/Favorite";
import VisibilityIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import "./font-pairing-snippet.css";

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
      <Card className="font-pairing-snippet">
        <CardContent>
          <h2 style={{ fontFamily: titleFont.family }}>{titleFont.family}</h2>
          <p style={{ fontFamily: fontContent.family }}>{fontContent.family}</p>
        </CardContent>
        <CardActions>
          <IconButton aria-label="like">
            <FavoriteIcon /> {pairing.num_liked}
          </IconButton>
          <IconButton aria-label="share">
            <VisibilityIcon /> {pairing.num_views}
          </IconButton>
        </CardActions>
        <CardActions>
          <Link to={fontsToSubUrl(titleFont, fontContent)}>View More</Link>
        </CardActions>
      </Card>
      {fontFacesNode}
    </>
  );
}

export default FontPairingItem;

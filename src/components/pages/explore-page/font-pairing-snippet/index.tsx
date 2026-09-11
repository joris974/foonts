import React from "react";
import { Link } from "react-router-dom";
import Fonts from "../../../common/fonts";
import { fontsToSubUrl } from "../../../../helpers/helper";
import { Font } from "../../../../types/font";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import { FontPairing } from "../../../../types/font-pairing";

type Props = {
  fontList: Font[];
  pairing: FontPairing;
};

function FontPairingItem(props: Props) {
  const { fontList, pairing } = props;
  const titleFont = fontList.find((font) => font.id === pairing.font_title_id);
  const fontContent = fontList.find(
    (font) => font.id === pairing.font_content_id,
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

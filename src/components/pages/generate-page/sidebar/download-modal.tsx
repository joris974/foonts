import React from "react";
import { Font } from "../../../../types/font";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  sectionTitle: {
    color: "#05668d",
    fontSize: "18px",
    marginTop: "8px",
    fontWeight: "bold"
  }
}));

type Props = {
  titleFont: Font;
  contentFont: Font;
  show: boolean;
  onHide: () => void;
};

function DownloadModal(props: Props) {
  const { titleFont, contentFont, show, onHide } = props;
  const classes = useStyles();

  const toUrlFontFamily = (st: string) => st.replace(/ /g, "+");
  const toFontCategory = (st: string) => st.replace("display", "cursive");
  const embedCode = `<link href="https://fonts.googleapis.com/css?family=${toUrlFontFamily(
    titleFont.family
  )}|${toUrlFontFamily(contentFont.family)}" rel="stylesheet">`;

  const cssCode = `
      font-family: '${titleFont.family}', ${toFontCategory(titleFont.category)};
      <br/>
      font-family: '${contentFont.family}', ${toFontCategory(
    contentFont.category
  )};
    `;

  return (
    <Dialog onClose={onHide} aria-labelledby="simple-dialog-title" open={show}>
      <DialogTitle>Fast ways to use these fonts</DialogTitle>
      <DialogContent>
        <Typography variant="h5" className={classes.sectionTitle}>
          You have selected these fonts
        </Typography>

        <Typography variant="h6">Title</Typography>
        <Typography variant="body1">{titleFont.family}</Typography>

        <Typography variant="h6">Paragraphs</Typography>
        <Typography variant="body1">{contentFont.family}</Typography>

        <Typography variant="h5" className={classes.sectionTitle}>
          Embed Font
        </Typography>
        <Typography variant="body1">
          To embed your selected fonts into a webpage, copy this code into the
          head of your HTML document.
        </Typography>

        <pre>{embedCode}</pre>

        <Typography variant="h5" className={classes.sectionTitle}>
          Specify in CSS
        </Typography>
        <p>Use the following CSS rules to specify these families:</p>
        <pre dangerouslySetInnerHTML={{ __html: cssCode }} />
      </DialogContent>
    </Dialog>
  );
}

export default DownloadModal;

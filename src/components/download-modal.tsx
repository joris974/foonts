import React from "react";
import Modal from "react-bootstrap/Modal";
import { Font } from "../types/font";

type Props = {
  titleFont: Font;
  contentFont: Font;
  show: boolean;
  onHide: () => void;
};

function DownloadModal(props: Props) {
  const { titleFont, contentFont, show, onHide } = props;

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
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Fast ways to use these fonts</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h4 className="section-title">You have selected these fonts</h4>
        <br />
        <h4 className="section-title">Title</h4>
        <p>{titleFont.family}</p>

        <h4 className="section-title">Paragraphs</h4>
        <p>{contentFont.family}</p>

        <h4 className="section-title margin-top-lg">Embed Font</h4>
        <p>
          To embed your selected fonts into a webpage, copy this code into the
          head of your HTML document.
        </p>
        <pre>{embedCode}</pre>

        <h4 className="section-title margin-top-lg">Specify in CSS</h4>
        <p>Use the following CSS rules to specify these families:</p>
        <pre dangerouslySetInnerHTML={{ __html: cssCode }} />
      </Modal.Body>
    </Modal>
  );
}

export default DownloadModal;

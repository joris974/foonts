import React from 'react'
import _ from 'lodash'
import Modal from 'react-bootstrap/lib/Modal'


class DownloadModal extends React.Component {
  render() {
    const {titleFont, contentFont, show, onHide} = this.props

    if (_.isNull(titleFont) || _.isNull(contentFont)) {
      return null
    }

    const toUrlFontFamily = st => st.replace(/ /g, "+")
    const toFontCategory = st => st.replace("display", "cursive")
    const embedCode =
      `<link href="https://fonts.googleapis.com/css?family=${toUrlFontFamily(titleFont.family)}|${toUrlFontFamily(contentFont.family)}" rel="stylesheet">`

    const cssCode = `
      font-family: '${titleFont.family}', ${toFontCategory(titleFont.category)};
      <br/>
      font-family: '${contentFont.family}', ${toFontCategory(contentFont.category)};
    `

    return (
      <Modal
        show={show}
        onHide={onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>Fast ways to use these fonts</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <h4 className="section-title">You have selected these fonts</h4>

          <div className="row margin-top-lg">
            <div className="col-xs-6 text-center">
              <div className="row">
                <div className="col-xs-12">
                  <b className="section-title">Title</b>
                </div>
                <div className="col-xs-12">
                  {titleFont.family}
                </div>
              </div>
            </div>
            <div className="col-xs-6 text-center">
              <div className="row">
                <div className="col-xs-12">
                  <b className="section-title">Paragraphs</b>
                </div>
                <div className="col-xs-12">
                  {contentFont.family}
                </div>
              </div>
            </div>
          </div>

          <h4 className="section-title margin-top-lg">Embed Font</h4>
          <p>To embed your selected fonts into a webpage, copy this code into the head of your HTML document.</p>
          <pre>
            {embedCode}
          </pre>

          <h4 className="section-title margin-top-lg">Specify in CSS</h4>
          <p>Use the following CSS rules to specify these families:</p>
          <pre dangerouslySetInnerHTML={{__html: cssCode}} />

        </Modal.Body>
      </Modal>
    )
  }
}

export default DownloadModal

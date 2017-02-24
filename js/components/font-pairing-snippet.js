import React from 'react'
import { Link } from 'react-router'
import _ from 'lodash'
import Fonts from './fonts.js'
import {fontsToSubUrl} from './../helpers/helper.js'

const FontPairingItem = (props) => {
  const {fontList, pairing} = props
  const fontTitle = _.find(fontList, font => font.id === pairing.font_title_id)
  const fontContent = _.find(fontList, font => font.id === pairing.font_content_id)

  const fontFacesNode = _
    .chain([fontTitle, fontContent])
    .filter(x => !_.isNull(x))
    .map(font =>
      <Fonts
        key={font.family}
        fontName={font.family}
        fontUrl={font.url}
      />
    )
    .value()

  return (
    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 font-pairing-item-wrapper">
      <Link to={fontsToSubUrl(fontTitle, fontContent)}>
        <div className="font-pairing-item">
          {fontFacesNode}
          <div className="row font-pairing-item-body">
            <div className="col-xs-12">
              <h3
                style={{fontFamily: fontTitle.family}}
              >
                {fontTitle.family}
              </h3>
              <p
                style={{fontFamily: fontContent.family}}
              >
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
  )
}

export default FontPairingItem

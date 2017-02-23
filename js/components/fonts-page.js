import React from 'react'

import _ from 'lodash'
import Fonts from './fonts.js'

const FontItem = (props) => {
  const font = props.font
  return (
    <div className="row font-item">
      <div className="col-xs-12">
        <Fonts
          key={font.family}
          fontName={font.family}
          fontUrl={font.url}
        />
        <h4>
          {font.family}
        </h4>
        <h3
          className="h2"
          style={{fontFamily: font.family}}
        >
          The quick brown fox jumps over the lazy dog
        </h3>

      </div>
    </div>
  )
}

class FontsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { numMaxVisible: 12 }
  }

  onClickSeeMore() {
    this.setState(
      { numMaxVisible: this.state.numMaxVisible + 12 }
    )
  }

  render() {
    const {fontList} = this.props
    const {numMaxVisible} = this.state

    const fontsNode = _
      .chain(fontList)
      .sortBy(font => font.family)
      .take(numMaxVisible)
      .map(font => {
        return (
          <FontItem
            key={font.id}
            font={font}
          />
        )
      })
      .value()

    const btnSeeMore =
      numMaxVisible > fontList.length ?
        null:
        <div className="row see-more-wrapper">
          <div className="col-xs-12 text-center">
            <button
              className="btn btn-default"
              onClick={this.onClickSeeMore.bind(this)}
            >
              See more <i className="fa fa-chevron-down"></i>
            </button>
          </div>
        </div>

    return (
      <div>
        <div className="container">
          {fontsNode}
          {btnSeeMore}
        </div>
      </div>
    )
  }
}

export default FontsPage

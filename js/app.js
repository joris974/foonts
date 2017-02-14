import { browserHistory } from 'react-router';
import React from 'react'
import $ from 'jquery'
import _ from 'lodash'

import Sidebar from './sidebar.js'
import Fonts from './fonts.js'
import DownloadModal from './download-modal.js'
import EditableTitle from './editable-title.js'
import EditableContent from './editable-content.js'

const googleFontsApiKey = "AIzaSyA0gI8XQTRYzu8rPdCeYsb4GNZ5BQt-lCw"
const googleApiUrl = `https://www.googleapis.com/webfonts/v1/webfonts`

function loadFonts() {
  return $.ajax(
    { url: googleApiUrl
    , data: {key: googleFontsApiKey}
    }
  )
}

function fontsFromUrlParams(paramsPathPiece, fontList) {
  if (_.isEmpty(paramsPathPiece)){
    return null
  }

  const paramChunks = paramsPathPiece.split("--")
  if (paramChunks.length !== 2) {
    return null
  }

  const [titleFontPathPiece, contentFontPathPiece] = paramChunks
  const fromUrl = st => st.replace(/-/g, " ")

  const [titleFontFamily, contentFontFamily] =
    [ fromUrl(titleFontPathPiece)
    , fromUrl(contentFontPathPiece)
    ]

  const findFontByFamily = family => _.find(fontList, font => font.family === family)

  const [titleFont, contentFont] =
    [ findFontByFamily(titleFontFamily)
    , findFontByFamily(contentFontFamily)
    ]

  if (_.some([titleFont, contentFont], x => !x)) {
    return null
  }

  return (
    { titleFont
    , contentFont
    }
  )

}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state =
      { titleFont: null
      , contentFont: null
      , fontList: []
      , isTitleLocked: false
      , isContentLocked : false
      , showDownloadModal: false
      }
  }

  componentDidMount() {
    loadFonts()
    .then((data) => {
      const fontList = data.items
      this.setState({fontList}, () => {

        let fromParams
        if (!_.isNull(this.props.params) && !_.isNull(this.props.params.fonts)) {
          fromParams = fontsFromUrlParams(this.props.params.fonts, fontList)
        }
        if (fromParams) {
          const titleFont = fromParams ? fromParams.titleFont : _.sample(fontList)
          const contentFont = fromParams ? fromParams.contentFont : _.sample(fontList)

          this.setState(
            { titleFont
            , contentFont
            }
          )
        } else {
          this.generate()
        }
      })
    })

    window.addEventListener('keydown', this.handleKeyPress.bind(this))
  }

  handleKeyPress(event) {
    if(_.includes(event.target.className.split(" "), "editable")) {
      return
    }

    if(event.keyCode == 32){
      this.generate()
    }
  }

  handleSwap() {
    const {titleFont, contentFont, isTitleLocked, isContentLocked} = this.state
    this.setState(
      { titleFont: contentFont
      , contentFont: titleFont
      , isTitleLocked: isContentLocked
      , isContentLocked: isTitleLocked
      }
    )
  }

  handleClickGenerate(e) {
    e.preventDefault()
    this.generate()
  }

  generate() {
    const {fontList, titleFont, contentFont, isTitleLocked, isContentLocked} = this.state
    const [randTitleFont, randContentFont] = _.sampleSize(fontList, 2)

    const newTitleFont = isTitleLocked ? titleFont : randTitleFont
    const newContentFont = isContentLocked ? contentFont : randContentFont

    const toUrlFontFamily = st => st.replace(/ /g, "-")
    const url = `/#/${toUrlFontFamily(newTitleFont.family)}--${toUrlFontFamily(newContentFont.family)}`
    browserHistory.push(url)

    this.setState(
      { titleFont: newTitleFont
      , contentFont: newContentFont
      }
    )
  }

  render() {
    const {titleFont, contentFont, isTitleLocked, isContentLocked} = this.state

    const fontFacesNode = _
      .chain([titleFont, contentFont])
      .filter(x => !_.isNull(x))
      .map(font =>
        <Fonts
          key={font.family}
          fontName={font.family}
          fontUrl={font.files.regular}
        />
      )
      .value()

    return (
      <div>

        {fontFacesNode}

        <nav className="navbar navbar-default navbar-foonts">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Foonts</a>
            </div>

            <ul className="nav navbar-nav navbar-right">
              <li>
                <a
                  onClick={this.handleClickGenerate.bind(this)}
                  href="#"
                >
                  Generate
                </a>
              </li>
              <li>
                <a
                  onClick={() => {this.setState({showDownloadModal: true})}}
                  href="#"
                >
                  Download
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container-fluid">
          <div className="row banner">
            <div className="col-xs-12 text-center">
              Press [Space] to generate new fonts
            </div>
          </div>
        </div>


        <div className="container">

          <div className="row">
            <div className="col-xs-4">
              <Sidebar
                titleFont={titleFont}
                contentFont={contentFont}
                isTitleLocked={isTitleLocked}
                isContentLocked={isContentLocked}
                onChangeLockTitle={() => {this.setState({isTitleLocked: !this.state.isTitleLocked})}}
                onChangeLockContent={() => {this.setState({isContentLocked: !this.state.isContentLocked})}}
                onClickSwap={this.handleSwap.bind(this)}
              />
            </div>
            <div className="col-xs-8">
              <EditableTitle font={titleFont} />
              <EditableContent font={contentFont} />
            </div>
          </div>
        </div>

        <DownloadModal
          show={this.state.showDownloadModal}
          onHide={() => {this.setState({showDownloadModal: false})}}
          titleFont={titleFont}
          contentFont={contentFont}
        />

      </div>
    )
  }
}

export default App

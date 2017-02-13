import React from 'react'
import $ from 'jquery'
import _ from 'lodash'

import Sidebar from './sidebar.js'
import Fonts from './fonts.js'
import ContentWithFont from './content-with-font.js'
import DownloadModal from './download-modal.js'

const googleFontsApiKey = "AIzaSyA0gI8XQTRYzu8rPdCeYsb4GNZ5BQt-lCw"
const googleApiUrl = `https://www.googleapis.com/webfonts/v1/webfonts`

function loadFonts() {
  return $.ajax(
    { url: googleApiUrl
    , data: {key: googleFontsApiKey}
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
      const [titleFont, contentFont] = _.sampleSize(fontList, 2)

      this.setState(
        { fontList
        , titleFont
        , contentFont
        }
      )
    })

    window.addEventListener('keydown', this.handleKeyPress.bind(this))
  }

  handleKeyPress(event) {
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
              <ContentWithFont font={titleFont}>
                <h1>
                  Foo
                </h1>
              </ContentWithFont>

              <ContentWithFont font={contentFont}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis porttitor diam, et feugiat sapien. Cras fringilla eros in tellus ultrices porttitor. Ut scelerisque volutpat velit, eu bibendum nisi fringilla at. Fusce vitae ligula eget magna molestie semper eu in diam. Sed scelerisque tristique nunc ac congue. Vivamus dolor risus, fringilla a nisl at, pellentesque mattis nisi. Duis vehicula mi nec enim hendrerit, quis convallis libero mattis. Ut pharetra, sem et tincidunt porttitor, felis urna tristique lacus, nec tincidunt nibh est et sapien. Vestibulum tempor nisi at congue sodales. Aliquam facilisis blandit elit nec tempor. Aenean commodo tortor ac justo ultrices, quis finibus diam tempus. Donec efficitur diam tellus, vitae varius diam euismod eu. Phasellus viverra tellus lacus. Nam quis ultrices libero.
                </p>
              </ContentWithFont>
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

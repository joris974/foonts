import { browserHistory } from 'react-router';
import React from 'react'
import $ from 'jquery'
import _ from 'lodash'

import Sidebar from './sidebar.js'
import Fonts from './fonts.js'

import EditableTitle from './editable-title.js'
import EditableContent from './editable-content.js'

import ApplicationMeta from './application-meta.js'

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

function updateFontStyle(changeType, fontStyleProps) {
  const {fontSize, fontWeight, fontStyle} = fontStyleProps

  let newFontSize = fontSize
  let newFontWeight = fontWeight
  let newFontStyle = fontStyle

  if (changeType === "italic") {
    newFontStyle = fontStyle === "italic" ? "normal" : "italic"
  }
  if (changeType === "bold") {
    newFontWeight = fontWeight === "bold" ? "normal" : "bold"
  }
  const newFontStyleProps =
    { fontSize: newFontSize
    , fontWeight: newFontWeight
    , fontStyle: newFontStyle
    }
  return newFontStyleProps
}

export function fontsToUrl(titleFont, contentFont) {
  const toUrlFontFamily = st => st.replace(/ /g, "-")
  return `/#/${toUrlFontFamily(titleFont.family)}--${toUrlFontFamily(contentFont.family)}`
}

const defaultTitleStyleProps =
  { fontSize: 36
  , fontWeight: "normal"
  , fontStyle: "normal"
  }

const defaultContentStyleProps =
  { fontSize: 14
  , fontWeight: "normal"
  , fontStyle: "normal"
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
      , titleFontStyleProps: defaultTitleStyleProps
      , contentFontStyleProps: defaultContentStyleProps
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
    if (_.includes(event.target.className.split(" "), "editable")) {
      return
    }
    if (event.target instanceof HTMLButtonElement) {
      return
    }

    if(event.keyCode == 32){
      this.generate()
    }
  }

  handleSwap() {
    const {titleFont, contentFont, isTitleLocked, isContentLocked, titleFontStyleProps, contentFontStyleProps} = this.state

    const newTitleFontStyleProps =
      { fontSize: titleFontStyleProps.fontSize
      , fontWeight: contentFontStyleProps.fontWeight
      , fontStyle: contentFontStyleProps.fontStyle
      }
    const newContentFontStyleProps =
      { fontSize: contentFontStyleProps.fontSize
      , fontWeight: titleFontStyleProps.fontWeight
      , fontStyle: titleFontStyleProps.fontStyle
      }
    this.setState(
      { titleFont: contentFont
      , contentFont: titleFont
      , isTitleLocked: isContentLocked
      , isContentLocked: isTitleLocked
      , titleFontStyleProps: newTitleFontStyleProps
      , contentFontStyleProps: newContentFontStyleProps
      }
    )
  }

  handleClickGenerate(e) {
    e.preventDefault()
    this.generate()
  }

  handleToggleTitleStyle(changeType) {
    const {titleFontStyleProps} = this.state
    const newTitleFontStyleProps = updateFontStyle(changeType, titleFontStyleProps)
    this.setState({titleFontStyleProps: newTitleFontStyleProps})
  }

  handleToggleContentStyle(changeType) {
    const {contentFontStyleProps} = this.state
    const newContentFontStyleProps = updateFontStyle(changeType, contentFontStyleProps)
    this.setState({contentFontStyleProps: newContentFontStyleProps})
  }

  generate() {
    const {fontList, titleFont, contentFont, isTitleLocked, isContentLocked} = this.state
    const [randTitleFont, randContentFont] = _.sampleSize(fontList, 2)

    const newTitleFont = isTitleLocked ? titleFont : randTitleFont
    const newContentFont = isContentLocked ? contentFont : randContentFont

    const url = fontsToUrl(newTitleFont, newContentFont)
    browserHistory.push(url)

    this.setState(
      { titleFont: newTitleFont
      , contentFont: newContentFont
      }
    )
  }

  render() {
    const {titleFont, titleFontStyleProps, contentFont, contentFontStyleProps, isTitleLocked, isContentLocked} = this.state

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

        <ApplicationMeta
          titleFont={titleFont}
          contentFont={contentFont}
        />

        {fontFacesNode}

        <nav className="navbar navbar-default navbar-foonts">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Foonts</a>
            </div>
          </div>
        </nav>

        <div className="container">

          <div className="row margin-top-lg">
            <div className="col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-4">
              <Sidebar
                titleFont={titleFont}
                titleFontStyleProps={titleFontStyleProps}
                onToggleTitleStyle={this.handleToggleTitleStyle.bind(this)}
                contentFont={contentFont}
                contentFontStyleProps={contentFontStyleProps}
                onToggleContentStyle={this.handleToggleContentStyle.bind(this)}
                isTitleLocked={isTitleLocked}
                isContentLocked={isContentLocked}
                onChangeLockTitle={() => {this.setState({isTitleLocked: !this.state.isTitleLocked})}}
                onChangeLockContent={() => {this.setState({isContentLocked: !this.state.isContentLocked})}}
                onClickSwap={this.handleSwap.bind(this)}
                onClickGenerate={this.handleClickGenerate.bind(this)}
              />
            </div>
            <div className="col-xs-12 col-sm-8">
              <EditableTitle
                font={titleFont}
                fontStyleProps={titleFontStyleProps}
              />
              <EditableContent
                font={contentFont}
                fontStyleProps={contentFontStyleProps}
              />
            </div>
          </div>
        </div>

        <footer className="text-center">
          Designed and built by <a href="https://github.com/joris974">Joris Buchou</a>. ©2017
        </footer>
      </div>
    )
  }
}

export default App

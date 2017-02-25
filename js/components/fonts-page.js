import React from 'react'

import _ from 'lodash'
import Fonts from './fonts.js'

const FontItem = (props) => {
  const font = props.font
  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="font-item">
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
    </div>
  )
}

const filterFontList = function(fontList, searchInput, fontCategories) {
  return _
    .chain(fontList)
    .filter(font => {
      if(_.isEmpty(searchInput)) {
        return true
      } else {
        return !_.isEmpty(font.family.trim().toLowerCase().match(searchInput.trim().toLowerCase()))
      }

    })
    .filter(font => {
      return _.includes(fontCategories, font.category)
    })
    .value()
}

const isChecked = function(fontCategories, category) {
  return _.includes(fontCategories, category)
}

const allCategories = () => ["display", "serif", "sans-serif", "monospace", "handwriting"]

class FontsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state =
      { numMaxVisible: 12
      , searchInput: ""
      , filteredFontList: props.fontList
      , fontCategories: allCategories()
      }
  }

  onClickSeeMore() {
    this.setState(
      { numMaxVisible: this.state.numMaxVisible + 12 }
    )
  }

  handleChangeSearch(e) {
    const {fontCategories} = this.state
    const searchInputVal = e.target.value
    const searchInput = _.isEmpty(searchInputVal) ? "" : searchInputVal
    const filteredFontList = filterFontList(this.props.fontList, searchInput, fontCategories)
    this.setState(
      { searchInput
      , filteredFontList
      }
    )
  }

  handleChangeCheckbox(category){
    const {fontCategories, searchInput} = this.state

    const newFontCategories =
      _.includes(fontCategories, category) ?
        _.filter(fontCategories, c => c !== category) :
        fontCategories.concat([category])

    const filteredFontList = filterFontList(this.props.fontList, searchInput, newFontCategories)
    this.setState(
      { fontCategories: newFontCategories
      , filteredFontList
      }
    )
  }

  render() {
    const {numMaxVisible, searchInput, filteredFontList, fontCategories} = this.state

    const fontsNode = _
      .chain(filteredFontList)
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
      numMaxVisible > filteredFontList.length ?
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

    const toCheckboxLi = (categ, title) => {
      const icon =
        isChecked(fontCategories, categ) ?
          <span className="custom-checkbox-icon fa fa-2x fa-check-square"></span> :
          <span className="custom-checkbox-icon fa fa-2x fa-square"></span>

      return (
        <li className="li-fixed-width">
          <div
            className={`custom-checkbox ${isChecked(fontCategories, categ) ? "checked" : ""}`}
            onClick={this.handleChangeCheckbox.bind(this, categ)}
          >

            {icon}
            <span className="custom-checkbox-label">
              {title}
            </span>
          </div>
        </li>
      )
    }

    return (
      <div>
        <div className="container">

          <div className="row margin-top-lg">
            <div className="col-xs-12 col-lg-8">
              <ul className="list-inline">
                {toCheckboxLi("serif", "Serif")}
                {toCheckboxLi("sans-serif", "Sans serif")}
                {toCheckboxLi("display", "Cursive")}
                {toCheckboxLi("handwriting", "Handwriting")}
                {toCheckboxLi("monospace", "Monospace")}
              </ul>
            </div>
            <div className="col-xs-12 col-lg-4">
              <input
                type="text"
                className="form-control input-lg"
                value={searchInput}
                placeholder="Search"
                onChange={this.handleChangeSearch.bind(this)}
              />
            </div>
          </div>

          {fontsNode}
          {btnSeeMore}
        </div>
      </div>
    )
  }
}

export default FontsPage

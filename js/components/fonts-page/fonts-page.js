import React from 'react'

import _ from 'lodash'
import FontListItem from './font-list-item.js'
import SortListFilter from './sort-list-filter.js'
import Checkbox from './../checkbox.js'

const filterFontList = function(fontList, fontCategories) {
  return _.filter(fontList, font => _.includes(fontCategories, font.category))
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
      , filteredFontList: props.fontList
      , fontCategories: allCategories()
      , sortedBy: "popular"
    }
  }

  onClickSeeMore() {
    this.setState(
      { numMaxVisible: this.state.numMaxVisible + 12 }
    )
  }

  handleChangeCheckbox(category){
    const {fontCategories} = this.state

    const newFontCategories =
      _.includes(fontCategories, category) ?
        _.filter(fontCategories, c => c !== category) :
        fontCategories.concat([category])

    const filteredFontList = filterFontList(this.props.fontList, newFontCategories)
    this.setState(
      { fontCategories: newFontCategories
      , filteredFontList
      }
    )
  }

  handleChangeSortBy(sortBy) {
    const {sortedBy} = this.state
    if (sortBy === sortedBy) {
      return
    }
    this.setState({sortedBy: sortBy})
  }

  render() {
    const {numMaxVisible, filteredFontList, fontCategories, sortedBy} = this.state

    const sortedList = _
      .chain(filteredFontList)
      .sortBy(font => {
        if (sortedBy === "alphabetical") {
          return font.family
        } else if (sortedBy === "popular") {
          return -font.num_liked
        }
      })
      .take(numMaxVisible)
      .value()

    const fontsNode = _.map(sortedList, font => {
      return (
        <FontListItem
          key={font.id}
          font={font}
        />
      )
    })


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
      return (
        <li className="li-fixed-width">
          <Checkbox
            isChecked={isChecked(fontCategories, categ)}
            handleChangeCheckbox={this.handleChangeCheckbox.bind(this, categ)}
            label={title}
          />
        </li>
      )
    }

    return (
      <div>
        <div className="container">

          <div className="row">
            <div className="col-xs-12 col-lg-4 margin-top-lg">
              <SortListFilter
                sortedBy={sortedBy}
                handleChangeSortBy={this.handleChangeSortBy.bind(this)}
              />
            </div>
            <div className="col-xs-12 col-lg-8 margin-top-lg">
              <ul className="list-inline">
                {toCheckboxLi("serif", "Serif")}
                {toCheckboxLi("sans-serif", "Sans serif")}
                {toCheckboxLi("display", "Cursive")}
                {toCheckboxLi("handwriting", "Handwriting")}
                {toCheckboxLi("monospace", "Monospace")}
              </ul>
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

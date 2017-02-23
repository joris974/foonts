import React from 'react'
import { Link } from 'react-router'
import _ from 'lodash'
import FontPairingItem from './font-pairing-snippet.js'

class ExplorePage extends React.Component {
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
    const {fontList, fontPairings} = this.props
    const {numMaxVisible} = this.state

    const spinner =
      <div className="spinner">
        <i className="fa fa-chevron fa-spin"></i>
      </div>

    const pairings = _
      .chain(fontPairings)
      .take(numMaxVisible)
      .map(pairing => {
        return (
          <FontPairingItem
            key={pairing.id}
            fontList={fontList}
            pairing={pairing}
          />
        )
      })
      .value()

    const btnSeeMore =
      numMaxVisible > fontPairings.length ?
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
        <div className="container-fluid explore-nav">
          <div className="row">
            <div className="col-xs-12 text-center">
              <ul className="explore-nav-menu list-inline">
                <li>
                  <Link
                    to="/explore/recent"
                    activeClassName="active"
                  >
                    Recent
                  </Link>
                </li>
                <li>
                  <Link
                    to="/explore/popular"
                    activeClassName="active"
                  >
                    Popular
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container font-pairing-wrapper">
          <div className="row">
            {pairings}
          </div>

          {btnSeeMore}

        </div>
      </div>
    )
  }
}

export default ExplorePage

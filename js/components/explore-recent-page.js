import React from 'react'
import ExplorePage from './explore-page.js'
import {loadRecentFontPairings} from './../helpers/api.js'

class ExploreRecentPage extends React.Component {
  constructor(props) {
    super(props)
    this.state =
      { recentFontPairings: []}
  }

  componentDidMount() {
    loadRecentFontPairings()
    .then((recentFontPairings) => {
      this.setState({recentFontPairings})
    })
  }

  render() {
    const {recentFontPairings} = this.state
    const {fontList} = this.props

    return (
      recentFontPairings.length > 0 ?
        <ExplorePage
          fontList={fontList}
          fontPairings={recentFontPairings}
        /> :
        <div className="spinner">
          <i className="fa fa-chevron fa-spin"></i>
        </div>
    )
  }
}

export default ExploreRecentPage

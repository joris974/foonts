import React from 'react'
import FontsPage from './fonts-page.js'
import {loadPopularFontPairings} from './../../helpers/api.js'
import Spinner from './../spinner.js'

class FontsPageWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {fontPairings: []}
  }

  componentDidMount() {
    loadPopularFontPairings()
    .then((fontPairings) => {
      this.setState({fontPairings})
    })
  }

  render() {
    const {fontList} = this.props
    const {fontPairings} = this.state

    return (
      fontPairings.length > 0 ?
        <FontsPage
          fontList={fontList}
          fontPairings={fontPairings}
        /> :
        <Spinner />
    )
  }
}

export default FontsPageWrapper

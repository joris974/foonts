import React from 'react'
import FontsPage from './fonts-page.js'

class FontsPageWrapper extends React.Component {

  render() {
    const {fontList} = this.props

    return (
      <FontsPage
        fontList={fontList}
      />
    )
  }
}

export default FontsPageWrapper

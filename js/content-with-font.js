import React from 'react'
import _ from 'lodash'

class ContentWithFont extends React.Component {

  render() {
    const font = this.props.font
    const style = !_.isNull(font) ? {fontFamily: font.family} : null
    return (
      <div style={style}>
        {this.props.children}
      </div>
    )
  }
}

export default ContentWithFont
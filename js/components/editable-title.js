import React from 'react'
import _ from 'lodash'

const DefaultTitle = "Find best matching fonts in seconds!!"

class EditableTitle extends React.Component {
  constructor(props) {
    super(props)
    this.state =
      { content: DefaultTitle }
  }

  handleChange() {
    this.setState({content: event.target.value})
  }

  render() {
    const {fontStyleProps, font} = this.props
    const {fontSize, fontWeight, fontStyle} = fontStyleProps

    const content = this.state.content
    const style =
      { fontSize: `${fontSize}px`
      , fontWeight: `${fontWeight}`
      , fontStyle: `${fontStyle}`
      , fontFamily: !_.isNull(font) ? font.family : ""
      }
    return (
      <h1
        style={style}
        contentEditable="true"
        className="editable editable-title"
        onChange={this.handleChange.bind(this)}
      >
        {content}
      </h1>
    )
  }
}

export default EditableTitle

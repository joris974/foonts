import React from 'react'
import _ from 'lodash'

const DefaultTitle = "Find best matching fonts in seconds!!"

class EditableTitle extends React.Component {
  constructor(props) {
    super(props)
    this.state =
      { content: DefaultTitle }
  }

  handleChange(e) {
    this.setState({content: event.target.value})
  }

  render() {
    const font = this.props.font
    const content = this.state.content
    const style = !_.isNull(font) ? {fontFamily: font.family} : null
    return (
      <div style={style}>
        <h1
          contentEditable="true"
          className="editable editable-title"
          onChange={this.handleChange.bind(this)}
        >
        {content}
      </h1>
      </div>
    )
  }
}

export default EditableTitle

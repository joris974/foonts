import React from 'react'
import _ from 'lodash'

const DefaultContent =
  [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis porttitor diam, et feugiat sapien.
    Cras fringilla eros in tellus ultrices porttitor.
    Ut scelerisque volutpat velit, eu bibendum nisi fringilla at.
    Fusce vitae ligula eget magna molestie semper eu in diam.`
  , `Sed scelerisque tristique nunc ac congue.
    Vivamus dolor risus, fringilla a nisl at, pellentesque mattis nisi.
    Duis vehicula mi nec enim hendrerit, quis convallis libero mattis.
    Ut pharetra, sem et tincidunt porttitor, felis urna tristique lacus, nec tincidunt nibh est et sapien.
    Vestibulum tempor nisi at congue sodales.`
  , `Aliquam facilisis blandit elit nec tempor.
    Aenean commodo tortor ac justo ultrices, quis finibus diam tempus.
    Donec efficitur diam tellus, vitae varius diam euismod eu.
    Phasellus viverra tellus lacus.
    Nam quis ultrices libero.
    `
  ]

class EditableContent extends React.Component {
  constructor(props) {
    super(props)
    this.state =
      { content: DefaultContent }
  }

  handleChange(e) {
    this.setState({content: event.target.value})
  }

  render() {
    const font = this.props.font
    const content = this.state.content
    const style = !_.isNull(font) ? {fontFamily: font.family} : null

    const contentPs = _.map(content, (line, i) => <p key={i}>{line}</p>)

    return (
      <div
        style={style}
        contentEditable="true"
        className="p editable editable-content"
        onChange={this.handleChange.bind(this)}
      >
        {contentPs}
      </div>
    )
  }
}

export default EditableContent

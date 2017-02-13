import React from 'react'

class Fonts extends React.Component {

  render() {
    const fontNode = this.props.font
    const {fontName, fontUrl} = this.props

    const fontFace = `
      @font-face {
        font-family: '${fontName}';
        src: url('${fontUrl}');
      }`;
    return (
      <style>
       {fontFace}
      </style>
    )
  }
}

export default Fonts

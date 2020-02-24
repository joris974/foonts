import React from 'react'

class Fonts extends React.Component {

  render() {
    const {fontName, fontUrl} = this.props

    const toHttps = st => st.replace(/http:/g, "https:")

    const fontFace = `
      @font-face {
        font-family: '${fontName}';
        src: url('${toHttps(fontUrl)}');
      }`
    return (
      <style>
       {fontFace}
      </style>
    )
  }
}

export default Fonts

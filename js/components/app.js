import React from 'react'

import {loadFonts} from './../helpers/api.js'
import Navbar from './navbar.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state =
      { fontList: [] }
  }

  componentDidMount() {
    loadFonts()
    .then((fontList) => {
      this.setState({fontList})
    })
  }

  render() {
    const {fontList} = this.state

    const children =
      this.props.children && fontList.length > 0 ?
        React.cloneElement(this.props.children, { fontList }) :
        <div className="spinner">
          <i className="fa fa-chevron fa-spin"></i>
        </div>

    return (
      <div>

        <Navbar />

        {children}

        <footer className="text-center">
          Designed and built by <a href="https://github.com/joris974">Joris Buchou</a>. ©2017
        </footer>
      </div>
    )
  }
}

export default App

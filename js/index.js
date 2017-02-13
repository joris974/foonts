import {Router, Route, hashHistory} from 'react-router';

import ReactDOM from 'react-dom'
import React from 'react'
import App from './app.js'

const mountNode = document.getElementById("main")

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/:fonts" component={App}/>
  </Router>,
  mountNode
)

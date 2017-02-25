import {Router, Route, IndexRedirect, hashHistory} from 'react-router';

import ReactDOM from 'react-dom'
import React from 'react'
import App from './../components/app.js'
import GeneratePage from './../components/generate-page.js'
import ExploreRecentPage from './../components/explore-recent-page.js'
import ExplorePopularPage from './../components/explore-popular-page.js'
import FontsPage from './../components/fonts-page.js'

const mountNode = document.getElementById("main")

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/generate" />
      <Route path="/generate" component={GeneratePage}>
        <Route path=":fonts" component={GeneratePage}/>
      </Route>
      <Route path="/explore/recent" component={ExploreRecentPage}/>
      <Route path="/explore/popular" component={ExplorePopularPage}/>
      <Route path="/fonts" component={FontsPage}/>
    </Route>
  </Router>,
  mountNode
)

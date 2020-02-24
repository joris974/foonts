import { Router, Route, IndexRedirect, hashHistory } from "react-router";

import ReactDOM from "react-dom";
import React from "react";
import App from "./../components/app.js";
import GeneratePage from "./../components/generate-page.js";
import ExploreRecentPage from "./../components/explore-recent-page.js";
import ExplorePopularPage from "./../components/explore-popular-page.js";
import FontsWrapper from "./../components/fonts-page/fonts-page-wrapper.js";

export function AppRouter() {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="/generate" />
        <Route path="/generate" component={GeneratePage}>
          <Route path=":fonts" component={GeneratePage} />
        </Route>
        <Route path="/explore/recent" component={ExploreRecentPage} />
        <Route path="/explore/popular" component={ExplorePopularPage} />
        <Route path="/fonts" component={FontsWrapper} />
      </Route>
    </Router>
  );
}

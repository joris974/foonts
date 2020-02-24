import { HashRouter, Switch, Route } from "react-router-dom";
import React from "react";
import App from "./../components/app.js";
import GeneratePage from "./../components/generate-page.js";
import ExploreRecentPage from "./../components/explore-recent-page.js";
import ExplorePopularPage from "./../components/explore-popular-page.js";
import FontsWrapper from "./../components/fonts-page/fonts-page-wrapper.js";

export function AppRouter() {
  return (
    <HashRouter>
      <App>
        <Switch>
          <Route path="/">
            <GeneratePage />
          </Route>
          <Route path="/generate/:fonts">
            <GeneratePage />
          </Route>
          <Route path="/explore/recent">
            <ExploreRecentPage />
          </Route>
          <Route path="/explore/popular">
            <ExplorePopularPage />
          </Route>
          <Route path="/fonts">
            <FontsWrapper />
          </Route>
        </Switch>
      </App>
    </HashRouter>
  );
}

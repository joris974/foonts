import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import App from "./../components/app.js";
import GeneratePage from "./../components/generate-page.js";
import ExploreRecentPage from "./../components/explore-recent-page.js";
import ExplorePopularPage from "./../components/explore-popular-page.js";
import FontsWrapper from "./../components/fonts-page/fonts-page-wrapper.js";

export function AppRouter() {
  return (
    <HashRouter>
      <Switch>
        <Redirect exact from="/" to="/generate" />
        <Route path="/generate/:fonts?">
          <App>
            <GeneratePage />
          </App>
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
    </HashRouter>
  );
}

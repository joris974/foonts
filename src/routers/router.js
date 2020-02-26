import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import App from "./../components/app.js";
import GeneratePage from "./../components/generate-page.js";
import ExploreRecentPage from "./../components/explore-recent-page.js";
import ExplorePopularPage from "./../components/explore-popular-page.js";
import FontsWrapper from "./../components/fonts-page/fonts-page-wrapper.tsx";

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
          <App>
            <ExploreRecentPage />
          </App>
        </Route>
        <Route path="/explore/popular">
          <App>
            <ExplorePopularPage />
          </App>
        </Route>
        <Route path="/fonts">
          <App>
            <FontsWrapper />
          </App>
        </Route>
      </Switch>
    </HashRouter>
  );
}

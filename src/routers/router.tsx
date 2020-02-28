import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import App from "../components/app";
import GeneratePage from "../components/generate-page";
import ExploreRecentPage from "../components/explore-recent-page";
import ExplorePopularPage from "../components/explore-popular-page";
import FontsPage from "../components/pages/fonts-page";

export function AppRouter() {
  return (
    <HashRouter>
      <App>
        <Switch>
          <Redirect exact from="/" to="/generate" />
          <Route path="/generate/:fonts?">
            <GeneratePage />
          </Route>
          <Route path="/explore/recent">
            <ExploreRecentPage />
          </Route>
          <Route path="/explore/popular">
            <ExplorePopularPage />
          </Route>
          <Route path="/fonts">
            <FontsPage />
          </Route>
        </Switch>
      </App>
    </HashRouter>
  );
}

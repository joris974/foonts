import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import App from "./../components/app";
import GeneratePage from "./../components/generate-page";
import ExploreRecentPage from "./../components/explore-recent-page";
import ExplorePopularPage from "./../components/explore-popular-page";
import FontsWrapper from "./../components/fonts-page/fonts-page-wrapper";

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

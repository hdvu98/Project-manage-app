import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Switch } from "react-router-dom";
import { RouterWithLayout, PageLayout } from "./components/common/";
import { Member } from "./components/members/";
import { ViewDetail, ProjectScreen } from "./components/projects/";
import { NotFound } from "./components/error/";
import { theme } from "./theme/";

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <RouterWithLayout
              path="/"
              exact
              layout={PageLayout}
              component={Member}
              activeTab="member"
            ></RouterWithLayout>
            <RouterWithLayout
              path="/member"
              exact
              layout={PageLayout}
              component={Member}
              activeTab="member"
            ></RouterWithLayout>
            <RouterWithLayout
              path="/project"
              exact
              layout={PageLayout}
              component={ProjectScreen}
              activeTab="project"
            ></RouterWithLayout>
            <RouterWithLayout
              path="/project/:id"
              layout={PageLayout}
              component={ViewDetail}
              activeTab="project"
            ></RouterWithLayout>
            <RouterWithLayout
              layout={PageLayout}
              component={NotFound}
            ></RouterWithLayout>
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </div>
  );
}

export default App;

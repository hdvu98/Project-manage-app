import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Switch } from "react-router-dom";
import { RouterWithLayout, PageLayout } from "./components/common/";
import { Member } from "./components/members/";
import { Project } from "./components/projects/";
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
              layout={PageLayout}
              component={Project}
              activeTab="project"
            ></RouterWithLayout>
            <RouterWithLayout
              path="/project/:id"
              layout={PageLayout}
              component={Project}
              activeTab="project"
            ></RouterWithLayout>
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </div>
  );
}

export default App;

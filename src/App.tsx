import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LmiaDataTable from './components/DataTable';
import Intro from './components/Intro';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import TopInfo from './components/TopInfo';

function App() {
  return (
    <Router>
      <ResponsiveDrawer>
        <Switch>
          <Route path="/data">
            <LmiaDataTable />
          </Route>
          <Route path="/province">
            <TopInfo infoType="province" />
          </Route>
          <Route path="/employer">
            <TopInfo infoType="employer" />
          </Route>
          <Route path="/occupation">
            <TopInfo infoType="occupation" />
          </Route>
          <Route path="/">
            <Intro />
          </Route>
        </Switch>
      </ResponsiveDrawer>
    </Router>
  );
}

export default App;

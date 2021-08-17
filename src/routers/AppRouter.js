import React from 'react';
import { BrowserRouter as Router
    
    , Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import NotesDashboard from '../components/NotesDashboard';
// import ProjectDashboard from '../components/ProjectDash/ProjectDashboard';



export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/" component={NotesDashboard} />
        {/* <Route path="/projectdashboard" component={ProjectDashboard} /> */}
        {/* <Route component={NotFoundPage} /> */}
      </Switch>
    </div>
  </Router>
);

export default AppRouter;

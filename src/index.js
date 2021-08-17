import ReactDOM from 'react-dom';
import React from 'react';

import { Provider } from 'react-redux';
import NotesDashboardPage from './components/NotesDashboard';
import ProjectDashboard from './components/ProjectDash/ProjectDashboard';
import store from './store/configureStore'
import './styles/styles.scss'
import 'normalize.css/normalize.css'
// import AppRouter from './routers/AppRouter';
import { BrowserRouter as Router
    
  , Route, Switch, Link, NavLink } from 'react-router-dom';
// import createHistory from 'history/createBrowserHistory';



ReactDOM.render(
  <Provider store={store}>
    {/* <NotesDashboardPage/> */}
    <Router >
      <div>
        <Switch>
          <Route path="/taskDash" component={NotesDashboardPage} />
          <Route path="/proDash" component={ProjectDashboard} />
          {/* <Route component={NotFoundPage} /> */}
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <Provider store = {store}>
//     {/* <NotesDashboardPage/> */}
//     <AppRouter/>
//   </Provider>, 
//   document.getElementById('root')
// );


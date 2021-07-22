import ReactDOM from 'react-dom';
import React from 'react';

import { Provider } from 'react-redux';
import NotesDashboardPage from './components/NotesDashboard';
import store from './store/configureStore'



ReactDOM.render(
  <Provider store = {store}>
    <NotesDashboardPage/>
  </Provider>, 
  document.getElementById('root')
);


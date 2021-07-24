import ReactDOM from 'react-dom';
import React from 'react';

import { Provider } from 'react-redux';
import NotesDashboardPage from './components/NotesDashboard';
import store from './store/configureStore'
import './styles/styles.scss'
import 'normalize.css/normalize.css'


ReactDOM.render(
  <Provider store = {store}>
    <NotesDashboardPage/>
  </Provider>, 
  document.getElementById('root')
);


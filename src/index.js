import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { addExpense } from './actions/notes';
import {setTextFilter} from './actions/filters'
import getVisibleExpenses from './selectors/notes'
import { Provider } from 'react-redux';
import NotesDashboardPage from './components/NotesDashboard';

import configureStore from './store/configureStore'

const store = configureStore()

store.dispatch(addExpense({description: "Water Bill"}))
console.log(store.getState())

const jsx = (
  <Provider store = {store}>
    <App/>
    <NotesDashboardPage/>
  </Provider>
)


ReactDOM.render(
  jsx, 
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

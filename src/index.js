import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';

import { Provider } from 'react-redux';
import NotesDashboardPage from './components/NotesDashboard';
import store from './store/configureStore'

import configureStore from './store/configureStore'
import Categorie from './components/Categorie';
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";


// const store = configureStore()

// store.dispatch(addExpense({description: "Water Bill", amount: 4544}))
// store.dispatch(addExpense({description: "Gas Bill", amount: 23}))
// store.dispatch(addExpense({description: "Bier Bill", amount: 99, createdAt:1000}))




ReactDOM.render(
  <Provider store = {store}>
    <NotesDashboardPage/>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import expensesReducer from '../reducers/notes';
import filtersReducer from '../reducers/filters';
import localStorageMiddleware from './local-storage';
import loggingMiddleware from './logging';
import thunk from 'redux-thunk';
import {localStorageKey} from './constants'


const composerFunction = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || compose

const getLocalStorageState = () => {
  const cache = localStorage.getItem(localStorageKey);
  return cache ? JSON.parse(cache) : {};
}
const middelwares = applyMiddleware(
  localStorageMiddleware, 
  loggingMiddleware)


const store =  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })


  export default createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
    }), 
    // getLocalStorageState(), 
    // composerFunction(applyMiddleware(thunk), applyMiddleware(localStorageMiddleware, loggingMiddleware))
  )
    
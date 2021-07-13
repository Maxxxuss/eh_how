import { createSelector } from 'reselect';

export const getExpenses = state => state.expenses

export const getAllExpenses = createSelector(
  getExpenses, 
  expenses => expenses.map(expense => ({
    id: expense.id,
    sRelevance: expense.priority * expense.relevance ? expense.priority * expense.relevance : "",
    description: expense.description? expense.description: "" ,
    relevance: expense.relevance? expense.relevance: "" ,
    priority: expense.priority? expense.priority: "" ,
    noteDecscription: expense.noteDecscription? expense.noteDecscription: "" ,
    createdAt: expense.createdAt? expense.createdAt: "" ,
    calenderFocused: expense.calenderFocused? expense.calenderFocused: "" ,
    date: randomDate(),
  })), 
)

function randomDate(date1= '02/13/2013', date2 = '01/01/2000'){
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  var date1 = date1 || '01-01-1970'
  var date2 = date2 || new Date().toLocaleDateString()
  date1 = new Date(date1).getTime()
  date2 = new Date(date2).getTime()
  if( date1>date2){
      return new Date(getRandomArbitrary(date2,date1)).toLocaleDateString()   
  } else{
      return new Date(getRandomArbitrary(date1, date2)).toLocaleDateString()  

  }
}


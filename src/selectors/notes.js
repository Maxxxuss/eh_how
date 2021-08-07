import { createSelector } from 'reselect';
import moment from 'moment';

export const getExpenses = state => state.expenses

export const getAllExpenses = createSelector(
  getExpenses, 
  expenses => expenses.map(expense => ({
    id: expense.id,
    categorie: expense.categorie ? expense.categorie : "", 
    doneDate: expense.doneDate ? expense.doneDate :"",
    noteStatus: expense.noteStatus ? expense.noteStatus: "open", 
    description: expense.description ? expense.description: "" ,
    prio: calculatePrio(expense.relevance, expense.relevance, expense.datesToFinish),
    datesToFinish: expense.datesToFinish ? expense.datesToFinish : "",
    sRelevance: expense.priority * expense.relevance ? expense.priority * expense.relevance : "",
    relevance: expense.relevance? expense.relevance: "" ,
    important: expense.important? expense.important: "" ,
    noteDecscription: expense.noteDecscription? expense.noteDecscription: "" ,
    datesToFinish: expense.datesToFinish? expense.datesToFinish: moment().add(1, 'days')
    // calenderFocused: expense.calenderFocused? expense.calenderFocused: "" ,

  
  })), 
)


 


function calculatePrio(important, relevance, datesToFinish) {

  var b = moment()
  var a = datesToFinish

  const difference = moment(a).diff(b)
  const days = moment.duration(difference).asDays()
  
  var calc = important * relevance 
  var faktor =  (3-days)*0.8

  if ( days < 0 ) {
    return calc * (3-days)
    
  }
  if (days < 1) {

    return calc * 1.5*faktor
  
  } if (days <= 2) {
    return calc *faktor *1.5
  } 
  else {
    return calc
    
  }

}



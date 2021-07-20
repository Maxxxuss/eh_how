import { createSelector } from 'reselect';
import moment from 'moment';

export const getExpenses = state => state.expenses

export const getAllExpenses = createSelector(
  getExpenses, 
  expenses => expenses.map(expense => ({
    id: expense.id,
    description: expense.description ? expense.description: "" ,
    prio: calculatePrio(expense.relevance, expense.relevance, expense.datesToFinish),
    datesToFinish: expense.datesToFinish ? expense.datesToFinish : "",
    categorie: expense.categorie ? expense.categorie : "", 
    sRelevance: expense.priority * expense.relevance ? expense.priority * expense.relevance : "",
    relevance: expense.relevance? expense.relevance: "" ,
    important: expense.important? expense.important: "" ,
    noteDecscription: expense.noteDecscription? expense.noteDecscription: "" ,
    datesToFinish: expense.datesToFinish? expense.datesToFinish: "" ,
    // calenderFocused: expense.calenderFocused? expense.calenderFocused: "" ,
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

  

 


function calculatePrio(important, relevance, datesToFinish) {

  var b = moment()
  var a = datesToFinish

  const difference = moment(a).diff(b)
  const days = moment.duration(difference).asDays()
  
  var calc = important * relevance 
  var faktor =  (3-days)*0.8


  console.log(days);
  console.log("_________");
  console.log("3+ Days:", faktor);


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



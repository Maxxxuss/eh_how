import { createSelector } from 'reselect';
import moment from 'moment';

export const getExpenses = state => state.expenses

export const getAllExpenses = createSelector(
  getExpenses, 
  expenses => expenses.map(expense => ({
    id: expense.id,
    categorie: expense.categorie ? expense.categorie : "", 
    noteUpdateDate: expense.noteUpdateDate ? expense.noteUpdateDate :"",
    noteStatus: expense.noteStatus ? expense.noteStatus: "open", 
    description: expense.description ? expense.description: "" ,
    prio: calculatePrio(expense.important, expense.relevance, expense.datesToFinish, expense.riskAuswirkung, expense.riskWahrscheinlichkeit),
    // datesToFinish: expense.datesToFinish ? expense.datesToFinish : "",
    sRelevance: expense.priority * expense.relevance ? expense.priority * expense.relevance : "",
    relevance: expense.relevance? expense.relevance: "" ,
    important: expense.important? expense.important: "" ,
    noteDecscription: expense.noteDecscription? expense.noteDecscription: "" ,
    datesToFinish: expense.datesToFinish? expense.datesToFinish: moment().add(1, 'days'), 
    nextStep: expense.nextStep ? expense.nextStep : "", 
    riskAuswirkung: expense.riskAuswirkung ? expense.riskAuswirkung : "", 
    riskWahrscheinlichkeit: expense.riskWahrscheinlichkeit ? expense.riskWahrscheinlichkeit :"", 
    infoNote: expense.infoNote ? expense.infoNote : false, 
    journalNote: expense.journalNote ? expense.journalNote : false
  
  })), 
)


 


function calculatePrio(important, relevance, datesToFinish, riskAuswirkung, riskWahrscheinlichkeit) {

  var rAuswi = (parseInt(riskAuswirkung,10))/100
  var rWahr = (parseInt(riskWahrscheinlichkeit,10))/100

  var rpz = rAuswi * rWahr >= 0 ? rAuswi * rWahr : 1

  var b = moment()
  var a = datesToFinish

  const difference = moment(a).diff(b)
  const days = moment.duration(difference).asDays()

  
  var calc = (important * relevance)+important*1.15
  var faktor =  Math.abs((3-days)*0.8)

  if ( days <= 0 ) {
    return calc * faktor * rpz 
    
  }
  if (days < 1) {

    return calc * 1.3*faktor *rpz 
  
  } if (days <= 2) {
    return calc *faktor *1.5 *rpz
  } 
  else {
    return calc
    
  }

}



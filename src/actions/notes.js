
import { v4 as uuidv4 } from 'uuid';

// ADD_EXPENSE
export const addExpense = (
  {
    description,
    relevance,
    important,
    noteDecscription,
    datesToFinish,
    calenderFocused,
    categorie, 
    noteUpdateDate,
    noteStatus, 
    nextStep,
    riskAuswirkung, 
    riskWahrscheinlichkeit,
    infoNote,
    journalNote,
 
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuidv4(),
    description,
    relevance,
    important,
    noteDecscription,
    datesToFinish,
    calenderFocused, 
    relevance, 
    categorie,
    noteUpdateDate,
    noteStatus,
    nextStep, 
    riskAuswirkung, 
    riskWahrscheinlichkeit,
    infoNote,
    journalNote,

}
});

// REMOVE_EXPENSE
// export const removeExpense = ({ id } = {}) => ({
//   type: 'REMOVE_EXPENSE',
//   id
// });
export const removeExpense = ({ id } = {}) => {
  return (dispatch) => {
    dispatch(({ 
      type: 'REMOVE_EXPENSE',
      id
      
     }));
  }
}


// EDIT_EXPENSE
export const editExpense = (id, updates) =>
({
  type: 'EDIT_EXPENSE',
  id,
  updates, 
}
);

export const changeStatus = (id, updates) =>
({
  type: 'CHANGE_STATUS',
  id,
  updates, 
});


import { v4 as uuidv4 } from 'uuid';

// ADD_EXPENSE
export const addExpense = (
  {
    description,
    relevance,
    priority,
    noteDecscription,
    createdAt,
    calenderFocused,
 
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuidv4(),
    description,
    relevance,
    priority,
    noteDecscription,
    createdAt,
    calenderFocused, 
    relevance, 
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
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

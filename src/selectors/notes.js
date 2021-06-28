import { createSelector } from 'reselect';

export const getExpenses = state => state.expenses

export const getAllExpenses = createSelector(
  getExpenses, 
  expenses => expenses.map(expense => ({
    id: expense.id,
    description: expense.description? expense.description: "" ,
    relevance: expense.relevance? expense.relevance: "" ,
    priority: expense.priority? expense.priority: "" ,
    noteDecscription: expense.noteDecscription? expense.noteDecscription: "" ,
    createdAt: expense.createdAt? expense.createdAt: "" ,
    calenderFocused: expense.calenderFocused? expense.calenderFocused: "" ,

  }))
)

// // Get visible expenses
// const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
//     return expenses.filter((expense) => {
//       const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
//       const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
//       const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
  
//       return startDateMatch && endDateMatch && textMatch;
//     }).sort((a, b) => {
//       if (sortBy === 'date') {
//         return a.createdAt < b.createdAt ? 1 : -1;
//       } else if (sortBy === 'amount') {
//         return a.amount < b.amount ? 1 : -1;
//       }
//     });
//   };


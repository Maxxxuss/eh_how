export function handelAddNote(props, updates) {
  props.addExpense(updates);
}

export function handelTakeChanges(props, updates) {
  props.editExpense(updates.id, updates);
}

export function handelRemoveNote(props, updates) {
  props.removeExpense({ id: updates.id });
  // console.log("Remove Note:", updates.id);
}

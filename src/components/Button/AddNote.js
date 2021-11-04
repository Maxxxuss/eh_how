import { autoSaveFunc } from "../inputs/autoSave";

export function handelAddNote(props, updates) {
  props.addExpense(updates);
  autoSaveFunc(props)

}

export function handelTakeChanges(props, updates) {
  props.editExpense(updates.id, updates);
  autoSaveFunc(props)

}

export function handelRemoveNote(props, updates) {
  props.removeExpense({ id: updates.id });
  autoSaveFunc(props)
}

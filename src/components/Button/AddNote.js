import moment from "moment";
import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";

import { removeCategorie } from "../../actions/categorie";
import {
  addExpense,
  changeStatus,
  editExpense,
  removeExpense,
} from "../../actions/notes";

// function handelAddNote(props) {}

// function handelAddNote(props) {}

// function handelAddNote(props) {}
export function handelAddNote(props, updates) {


  props.addExpense(updates);

  console.log("Nex Button Fired", props);
}

export function handelTakeChanges(props, updates) {
  console.log("updates fired", props, "Updates",updates);


  props.editExpense(updates.id, updates);
  // props.editExpense()

}

// export function AddNoteButton(props) {
//   const [newOrChange, setNewOrChange] = useState("");

//   if (props.updates.newOrChange != newOrChange) {
//     setNewOrChange(props.updates.newOrChange);
//   }

//   return (
//     // <Button onClick={() => handelAddNote(props)}>
//     //   {newOrChange === "OLD" ? "Take Changes" : "Add"}
//     // </Button>

//     <Button
//       onClick={() => {
//         newOrChange === "OLD" ? handelTakeChanges(props) : handelAddNote(props);
//       }}
//     >
//       {newOrChange === "OLD" ? "Take Changes" : "Add"}
//     </Button>
//   );
// }

// const mapStateToProps = (state) => {
//   return {};
// };

// const mapDispatchToProps = (dispatch) => ({
//   removeExpense: (id) => dispatch(removeExpense(id)),
//   addExpense: (expense) => dispatch(addExpense(expense)),
//   editExpense: (id, updates) => dispatch(editExpense(id, updates)),
//   changeStatus: (id, updates) => dispatch(changeStatus(id, updates)),
//   removeCategorie: (id) => dispatch(removeCategorie(id)),
// });

// export default connect(null, mapDispatchToProps)(handelAddNote);

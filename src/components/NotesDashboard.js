import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import store from "../store/configureStore";
import { Grid } from "@mui/material";

import ImpExpData from "./ImpExpData";
import { getAllExpenses } from "../selectors/notes";
import { ShortDescription } from "./inputs/titel";
import { addActiveNote, removeActiveNote } from "../actions/activeNote";
import { getAllActiveNotes } from "../selectors/activeNote";
import { addExpense, editExpense, removeExpense } from "../actions/notes";
import { SearchForNotes } from "./inputs/search";
import { FilteredNotesList, ShowNotes } from "./showNoteList";



export function setActiveNote(expense, props) {
  //ALS PROPS MÜSSEN ÜBERGEBEN WERDEN (1) Add ActiveNote und RemoveActiveNote
  props.removeActiveNote();
  if (expense != "" && expense != null && expense != undefined) {
    const updates = {
      id: expense.id,
      description: expense.description,
      relevance: expense.relevance,
      important: expense.important,
      noteDecscription: expense.noteDecscription,
      datesToFinish: expense.datesToFinish,
      activeCategorieCatName: expense.activeCategorieCatName,
      nextStep: expense.nextStep,
      infoNote: expense.infoNote,
      effort: expense.effort,
      noteStatus: expense.noteStatus,
    };
    props.addActiveNote(updates);
    console.log("Active Notee: ", updates);
  }
}


export function NotesDashboardPage(props) {

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"

      >
      <Grid>Header</Grid>

      <Grid container direction="row">
        <Grid item xs={6}>
          <SearchForNotes props={props} />
          {/* <ShowNotes props={props} /> */}
          <FilteredNotesList props={props}/>
        </Grid>
        <Grid item xs={6}>
          <ShortDescription NotesDashboradProps={props} />
        </Grid>
      </Grid>

      <Grid>
        <ImpExpData />
      </Grid>
    </Grid>
  );
}
console.log(store.getState());

const mapStateToProps = (state) => {
  return {
    activeNote: getAllActiveNotes(state),
    expenses: getAllExpenses(state).sort((a, b) => (a.prio > b.prio ? -1 : 1)),
    openExpenses: getAllExpenses(state)
      .sort((a, b) => (a.prio > b.prio ? -1 : 1))
      .filter((expense) => expense.noteStatus === "open"),

    //   historyCategorie: getHistorieCategorie(state),
    //   globalVariables: getGlobalVariables(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  addActiveNote: (activeNote) => dispatch(addActiveNote(activeNote)),
  removeActiveNote: () => dispatch(removeActiveNote()),
  removeExpense: (id) => dispatch(removeExpense(id)),
  addExpense: (expense) => dispatch(addExpense(expense)),
  editExpense: (id, updates) => dispatch(editExpense(id, updates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesDashboardPage);

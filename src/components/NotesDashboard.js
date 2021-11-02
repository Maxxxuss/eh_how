import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import store from "../store/configureStore";
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Container,
  Grid,
  makeStyles,
  Paper,
  styled,
} from "@mui/material";

import ImpExpData from "./ImpExpData";
import { getAllExpenses } from "../selectors/notes";
import { ShortDescription } from "./inputs/titel";
import { addActiveNote, removeActiveNote } from "../actions/activeNote";
import { getAllActiveNotes } from "../selectors/activeNote";
import { addExpense, editExpense, removeExpense } from "../actions/notes";
import { setCategorie, removeCategorie } from "../actions/categorie";

import { SearchForNotes } from "./inputs/search";
import { FilteredNotesList, ShowNotes } from "./showNoteList";
import ProjectTabPanelDetails from "./ProjectDash/ProjectTapPanelDetails";
import { getAllCategories } from "../selectors/categories";
import AddDeleteProject from "./AddDeleteProject";

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
      categorie: expense.categorie,
      nextStep: expense.nextStep,
      infoNote: expense.infoNote,
      effort: expense.effort,
      noteStatus: expense.noteStatus,
    };
    props.addActiveNote(updates);
    console.log("Active Notee: ", updates);
  }
}

// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(2),
//   textAlign: 'flex-start',
//   color: theme.palette.text.secondary,
// }));

export function NotesDashboardPage(props) {
  const [tabCategorie, setTabCategorie] = useState(0);
  const [activeCategorie, setActiveCategorie] = useState("");

  if (props.categories.length < 1) {
    props.setCategorie({
      catName: "ALL",
      catID: 0,
    });
  }

  const ProjectTab = (categories) =>
    categories.map((categorie, index) => (
      <Tab
        key={categorie.sorting ? categorie.sorting : index}
        label={categorie.catName}
        //ADD Filter for Showing Notes on Selctesd Categorie
        // onClick={() => props.addActiveNote(categorie)}
        onClick={() => setActiveCategorie(categorie) }
        style={{
          fontSize: 16,
        }}
      ></Tab>
    ));

    useEffect(()=> console.log("CAT_ NotesDashboarPage - Active Catergorie: ", activeCategorie))

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 8,
      }}
    >
      <Box mt={2} mb={2} mr={2} ml={2}>
        <Grid container>
          <Grid item xs={10}>
            <AppBar position="static" color="default">
              <Tabs
                value={tabCategorie}
                onChange={(e, newValue) => setTabCategorie(newValue)}
                indicatorColor="secondary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="action tabs example"
              >
                {/* <Tab
                  label="ALL"
                  onClick={(e, newValue) => setActiveCategorie(newValue)}
                  style={{
                    fontSize: 14,
                  }}
                ></Tab> */}
                {ProjectTab(props.categories)}
              </Tabs>
            </AppBar>
          </Grid>
          <AddDeleteProject setCategorie={props.setCategorie} />

          <Grid item xs={2}></Grid>
        </Grid>
      </Box>
      <Container>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}></Grid>
            <Grid item xs={6}>
              <SearchForNotes props={props} />
              <FilteredNotesList
                props={props}
                activeCategorie={activeCategorie}
              />
            </Grid>
            <Grid item xs={6}>
              <ShortDescription
                NotesDashboradProps={props}
                activeCategorie={activeCategorie}
              />
            </Grid>
            <Grid item xs={12}>
              <ImpExpData />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>

    // <Grid container direction="column" alignItems="center">
    //   <Grid>Header</Grid>

    //   <Grid container direction="row" justifyContent="flex-start" spacing={2}>
    //     <Grid item xs>
    //       <Item elevation={24}>
    //         <SearchForNotes props={props} />
    //         {/* <ShowNotes props={props} /> */}
    //         <FilteredNotesList props={props} />
    //       </Item>
    //     </Grid>
    //     <Grid item xs>
    //       <Paper>
    //         <ShortDescription NotesDashboradProps={props} />
    //       </Paper>
    //     </Grid>
    //   </Grid>

    //   <Grid>
    //     <ImpExpData />
    //   </Grid>
    // </Grid>
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
    categories: getAllCategories(state).sort((a, b) =>
      a.sorting > b.sorting ? 1 : -1
    ),

    //   historyCategorie: getHistorieCategorie(state),
    //   globalVariables: getGlobalVariables(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  setCategorie: (categorie) => dispatch(setCategorie(categorie)),
  removeCategorie: (id) => dispatch(removeCategorie(id)),

  addActiveNote: (activeNote) => dispatch(addActiveNote(activeNote)),
  removeActiveNote: () => dispatch(removeActiveNote()),
  removeExpense: (id) => dispatch(removeExpense(id)),
  addExpense: (expense) => dispatch(addExpense(expense)),
  editExpense: (id, updates) => dispatch(editExpense(id, updates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesDashboardPage);

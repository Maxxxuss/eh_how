import React from 'react'
import NotesList from './NotesList'
import NoteListFilter from './NoteListFilter'
import NotesForm from './AddNotes'
import { connect } from 'react-redux'
import { addExpense, removeExpense } from '../actions/notes'
import store from '../store/configureStore'
import AddNotes from '../container/AddNotes'
import Categorie from './Categorie'
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";


const NotesDashboardPage = (props) => (
    <div>
        <Categorie/>
     

        <NotesList
        />
        <NoteListFilter/>

    </div>
)
console.log(store.getState());

// // const mapStateToProps = (state, props) => ({
// //     expense: state.expenses.find((expense) => expense.id === props.match.params.id)
// //   });
  
// //   const mapDispatchToProps = (dispatch, props) => ({
// //     startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
// //     startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
// //   });

export default connect( ) (NotesDashboardPage)
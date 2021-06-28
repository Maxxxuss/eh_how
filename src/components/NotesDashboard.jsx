import React from 'react'
import NotesList from './NotesList'
import NoteListFilter from './NoteListFilter'
import NotesForm from './AddNotes'
import { connect } from 'react-redux'
import { addExpense, removeExpense } from '../actions/notes'
import store from '../store/configureStore'


const NotesDashboardPage = (props) => (
    <div>
        <NotesForm
        onSubmit = {(expense)=> {
            props.dispatch(addExpense(expense))
        }}
        onChange =  {(expense)=> {
            console.log(expense)
        }}
        />

        <NotesList
        />
        <NoteListFilter/>

    </div>
)
console.log(store.getState());

export default connect() (NotesDashboardPage)
import React from 'react'
import NotesList from './NotesList'
import NoteListFilter from './NoteListFilter'
import { connect } from 'react-redux'
import store from '../store/configureStore'
import Categorie from './Categorie'
import ImpExpData from './ImpExpData'


const NotesDashboardPage = (props) => (
    <div>
        <NotesList/>
        {/* <NoteListFilter/> */}
        <ImpExpData/>

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

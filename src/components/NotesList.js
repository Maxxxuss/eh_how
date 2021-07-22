import React from 'react'
import { connect  } from 'react-redux' 
import { setCategorie } from '../actions/categorie'
import {removeExpense, addExpense, editExpense} from '../actions/notes'
import { getAllCategories } from '../selectors/categories'
import { getAllExpenses } from '../selectors/notes'
import AddNotes from './AddNotes'
import ShowEditNotes from './ShowEditNotes'


class NotesList extends React.Component {
    constructor (props) {
        super(props)
        this.state= {
            id: this.props.expenses.id ? this.props.expenses.id : "pups", 
            // description: 
            // allExpenses: this.props.expenses ? this.props.expenses.sort((a,b) => (a.sRelevance > b.sRelevance) ? 1: -1) :"",
            activeNote: "", 
            allExpenses: this.props.expenses,
            activeCategorie: "",
            filteredExp: "", 
            // description: this.activeNote ? this.activeNote.description : this.description, 
            description: "", 
            noteDecscription:"",
            relevance:"", 
            important:"", 
            datesToFinish:"", 
            categorie:"", 
        }

        }
    

    handelRemoveNote = () => {
        this.props.removeExpense ({id: this.state.activeNote.id})
    }

    setActiveNote = (expense) => {
        this.setState({activeNote : expense})
        this.setState({description : expense.description})
        this.setState({noteDecscription : expense.noteDecscription})
        this.setState({relevance : expense.relevance})
        this.setState({important : expense.important})
        this.setState({datesToFinish : expense.datesToFinish})
        this.setState({categorie : expense.categorie})


        console.log("Active Note: " , this.state.activeNote.description , this.state.activeNote)
    }

    DisplyFilterExpensesByCate = (expenses = this.props.expenses) => {
       const filteExp =  expenses.filter( expense => expense.categorie === this.state.activeCategorie.id)
       this.setState({filteredExp : filteExp })
    console.log(filteExp);

    //    console.log("FIltered expenses", this.state.filteredExp)
       this.displayLinkedNotes(filteExp)
    }


    displayLinkedNotes = (expenses) => 
    // {
    // const exp = expenses.sort((a,b) => (a.sRelevance > b.sRelevance) ? -1: 1)
    expenses.map(expense => (
    <li
        key={expense.id}  
        onClick ={() => this.setActiveNote(expense)}
        > 
        {Math.round( expense.prio)}{" - "} {expense.description} 
        </li>
    ), 
    console.log("expense on DisplLinkNodtes", expenses)
    )
// }
    displayCategories = (categories) => 
    categories.map(categorie => (
        <li
            key = {categorie.id}
            onClick ={() => this.setActiveCategorie(categorie)}
            >
        {categorie.catName}
        </li>
    )
    )

    mapExpensesForDisplay = (expenses) => 
    expenses.map(expense => (
    <li
        key={expense.id}  
        onClick ={() => this.setActiveNote(expense)}
        > 
        # {expense.sRelevance} {"--" } {expense.description}
        </li>
    ), 
    console.log("expense on DisplLinkNodtes", expenses)
    )


setActiveCategorie = (categorie) => {
  
  this.setState({activeCategorie : categorie})
  console.log("active Kategoei", this.state.activeCategorie.catName)
  this.DisplyFilterExpensesByCate(this.props.expenses)

}

onSubmitChanges = () => {
    const description = this.state.description 
    const relevance= this.state.relevance
    const important= this.state.important
    const noteDecscription= this.state.noteDecscription

    const updates =  {description, relevance, important, noteDecscription}

    this.props.editExpense(this.state.activeNote.id, updates)
    console.log("edit Expense: ", this.state.activeNote.id, updates);
   
}

// onDescriptionChange = (e) =>{
//     const description = e.target.value
//     this.setState(()=>({description}))
// }
// onNoteDescriptionChange = (e) =>{
//     const noteDecscription = e.target.value
//     this.setState(()=>({noteDecscription}))
// }
// onRelevanveChange = (e) =>{
//     const relevance = e.target.value
//     this.setState(()=>({relevance}))
// }
// onimportantChange = (e) =>{
//     const important = e.target.value
//     this.setState(()=>({important}))
// }
// onDateChange = (datesToFinish) => {
//     this.setState(()=> ({datesToFinish}))
// }

// onCategorieChange = (e) => {
//     const categorie = e.target.value
//     this.setState(()=>({categorie}))
// }

displayMetaData = () => {
    
    const {activeNote, description, noteDecscription, important, relevance } = this.state
        return (
            <div>
                <div>
                    {/* <form onSubmit={this.onSubmit} > */}
                  <input
                     type="text"
                    placeholder=  "Beschreibung"
                    value = {description}
                    onChange={this.onDescriptionChange}

                    />
                      <input
                     type="text"
                    placeholder="Relevance"
                    value= {relevance}
                    
                    onChange={this.onRelevanveChange}
                    /> 
                     <input
                    type="text"
                   placeholder="important"
                   value= {important}
                   onChange={this.onimportantChange}
                   />
                   <textarea 
                   placeholder= "NoteDescription"
                   value={noteDecscription}
                   onChange= {this.onNoteDescriptionChange}
                   />
                   <button
                   onClick = {this.onSubmitChanges}
                   >Take Changes</button>
                   {/* </form> */}

                </div>
            </div>
        )
    }



    render (){
        const {filteredExp, description, relevance,important, noteDecscription, activeNote, datesToFinish} = this.state
        const {expenses, categories} = this.props
        return (
     
            <div>
                <div>
                    {this.displayCategories(categories)}
                </div>

                <div>
                    <AddNotes 
                    addExpense = {this.props.addExpense}
                    categories = {this.props.categories}
                    setCategorie = {this.props.setCategorie}
                    activeCategorie = {this.state.activeCategorie}

                    />
                </div>
                <button
                onClick= {this.handelRemoveNote}
                >
                    remove
                </button>
                <div>

                    {/* {this.displayLinkedNotes(this.state.filteredExp.sort((a,b) => (a.sRelevance > b.sRelevance) ? -1: 1)) } */}

                    {this.displayLinkedNotes(expenses)}

                   {/* { this.displayLinkedNotes(expenses.sort((a,b) => (a.sRelevance > b.sRelevance) ? -1: 1)) } */}


                </div>

                <div>
                        <ShowEditNotes 
                        activeNote ={activeNote}
                        relevance = {relevance}
                        important = {important}
                        noteDecscription = {noteDecscription}
                       description = {description}
                       datesToFinish = {datesToFinish}


                        editExpense = {this.props.editExpense}
                        />
                        {/* {this.displayMetaData()} */}


                </div>
            </div>
        )
    } 
}


const mapStateToProps = (state)=>{
    return{
        expenses : getAllExpenses(state).sort((a,b) => (a.prio > b.prio) ? -1: 1), 
        categories: getAllCategories(state), 
        
    }
}

const mapDispatchToProps =(dispatch) =>({
    removeExpense: (id) => dispatch(removeExpense(id)),
    addExpense: (expense) => dispatch(addExpense(expense)),
    setCategorie: (categorie) => dispatch(setCategorie(categorie)),
    editExpense: (id, updates) => dispatch(editExpense(id, updates)), 


}) 

export default connect(
    mapStateToProps, 
    mapDispatchToProps)
    (NotesList)
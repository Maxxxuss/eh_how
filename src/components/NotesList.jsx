import React from 'react'
import { connect  } from 'react-redux' 
import { setCategorie } from '../actions/categorie'
import {removeExpense, addExpense, editExpense} from '../actions/notes'
import { getAllCategories } from '../selectors/categories'
import { getAllExpenses } from '../selectors/notes'
import AddNotes from './AddNotes'
import ShowEditNotes from './ShowEditNotes'


class NotesList extends React.Component {
  
        state= {
            id: this.props.expenses.id ? this.props.expenses.id : "pups", 
            activeNote: "", 
            allExpenses: this.props.expenses,
            activeCategorie: "",
            filteredExp: "", 
            // description: this.activeNote ? this.activeNote.description : this.description, 
            description: "", 
            noteDecscription:"",
            relevance:"", 
            priority:"", 
            createdAt:"", 
            categorie:"", 
        }


    handelRemoveNote = () => {
        this.props.removeExpense ({id: this.state.activeNote.id})
    }

    setActiveNote = (expense) => {
        this.setState({activeNote : expense})
        this.setState({description : expense.description})
        this.setState({noteDecscription : expense.noteDecscription})
        this.setState({relevance : expense.relevance})
        this.setState({priority : expense.priority})
        this.setState({createdAt : expense.createdAt})
        this.setState({categorie : expense.categorie})


        console.log("Active Note: " , this.state.activeNote.description)
    }

    DisplyFilterExpensesByCate = (expenses ) => {
       const filteExp =  expenses.filter( expense => expense.categorie === this.state.activeCategorie.id)
       this.setState({filteredExp : filteExp })
    console.log(filteExp);

    //    console.log("FIltered expenses", this.state.filteredExp)
    //    this.displayLinkedNotes(filteExp)
    }


    displayLinkedNotes = (expenses) => 
    // {
    // const exp = expenses.sort((a,b) => (a.sRelevance > b.sRelevance) ? -1: 1)
    expenses.map(expense => (
    <li
        key={expense.id}  
        onClick ={() => this.setActiveNote(expense)}
        > 
        {expense.sRelevance}{" - "} {expense.description} 
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
    const priority= this.state.priority
    const noteDecscription= this.state.noteDecscription

    const updates =  {description, relevance, priority, noteDecscription}



    this.props.editExpense(this.state.activeNote.id, updates)
    console.log("edit Expense: ", this.state.activeNote.id, updates);
   
}

onDescriptionChange = (e) =>{
    const description = e.target.value
    this.setState(()=>({description}))
}
onNoteDescriptionChange = (e) =>{
    const noteDecscription = e.target.value
    this.setState(()=>({noteDecscription}))
}
onRelevanveChange = (e) =>{
    const relevance = e.target.value
    this.setState(()=>({relevance}))
}
onPriorityChange = (e) =>{
    const priority = e.target.value
    this.setState(()=>({priority}))
}
onDateChange = (createdAt) => {
    this.setState(()=> ({createdAt}))
}

onCategorieChange = (e) => {
    const categorie = e.target.value
    this.setState(()=>({categorie}))
}

displayMetaData = () => {
    
    const {activeNote, description, noteDecscription, priority, relevance } = this.state
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
                   placeholder="Priority"
                   value= {priority}
                   onChange={this.onPriorityChange}
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
        const {filteredExp} = this.state
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
                    {this.displayLinkedNotes(filteredExp ? filteredExp : expenses )}
                </div>

                <div>
                        {/* <ShowEditNotes 
                        activeNote = {this.state.activeNote}
                        editExpense = {this.props.editExpense}
                        /> */}
                        {this.displayMetaData()}


                </div>
            </div>
        )
    } 
}

const mapStateToProps = (state)=>{
    return{
        expenses : getAllExpenses(state).sort((a,b) => (a.sRelevance > b.sRelevance) ? -1: 1), 
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
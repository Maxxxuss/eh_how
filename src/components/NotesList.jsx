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
            filteredExp: [] ? this.props.expenses : ""

        }
    }

    handelRemoveNote = () => {
        this.props.removeExpense ({id: this.state.activeNote.id})
    }

    setActiveNote = (expense) => {
        this.setState({activeNote : expense})
        console.log("Active Note: " , this.state.activeNote.description)
    }

    DisplyFilterExpensesByCate = (expenses = this.props.expenses) => {
       const filteExp =  expenses.filter( expense => expense.categorie === this.state.activeCategorie.id)
       this.setState({filteredExp : filteExp })
    console.log(filteExp);

    //    console.log("FIltered expenses", this.state.filteredExp)
       this.displayLinkedNotes(filteExp)
    }

displayLinkedNotes = (expenses) => 
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

setActiveCategorie = (categorie) => {
  
  this.setState({activeCategorie : categorie})
  console.log("active Kategoei", this.state.activeCategorie.catName)
  this.DisplyFilterExpensesByCate()

}


    render (){
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

                    {this.displayLinkedNotes(this.state.filteredExp.sort((a,b) => (a.sRelevance > b.sRelevance) ? -1: 1)) }

                   {/* { this.displayLinkedNotes(expenses.sort((a,b) => (a.sRelevance > b.sRelevance) ? -1: 1)) } */}


                </div>

                <div>
                    <div>
                        <ShowEditNotes 
                        activeNote = {this.state.activeNote}
                        editExpense = {this.props.editExpense}
                        />


                    </div>
                </div>
            </div>
        )
    } 
}

const mapStateToProps = (state)=>{
    return{
        expenses : getAllExpenses(state), 
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
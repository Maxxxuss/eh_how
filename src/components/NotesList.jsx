import { thisTypeAnnotation } from '@babel/types'
import React from 'react'
import { connect  } from 'react-redux' 
import { Link } from 'react-router-dom'
import { setCategorie } from '../actions/categorie'
import {removeExpense, addExpense} from '../actions/notes'
import { getAllCategories } from '../selectors/categories'
import { getAllExpenses } from '../selectors/notes'
import AddNotes from './AddNotes'


class NotesList extends React.Component {
    constructor (props) {
        super(props)
        this.state= {
            id: this.props.expenses.id ? this.props.expenses.id : "pups", 
            // description: 
            // allExpenses: this.props.expenses ? this.props.expenses.sort((a,b) => (a.sRelevance > b.sRelevance) ? 1: -1) :"",
            activeNote: this.props.expenses.description ? this.props.expenses.description : "", 
            allExpenses: this.props.expenses
        }
    }

    handelRemoveNote = () => {
        this.props.removeExpense ({id: this.state.activeNote.id})
    }

    setActiveNote = (expense) => {
        this.setState({activeNote : expense})
        console.log("Active Note: " , this.state.activeNote)
    }

displayLinkedNotes = (expenses) => 
expenses.map(expense => (
  <li
    key={expense.id}  
    onClick ={() => this.setActiveNote(expense)}
    > 
       # {expense.sRelevance} {"--" } {expense.description}
    </li>
  ))


    render (){
        const {expenses} = this.props
        const {allExpenses} = this.state
        return (
     
            <div>
                <div>
                    <AddNotes 
                    addExpense = {this.props.addExpense}
                    categories = {this.props.categories}
                    setCategorie = {this.props.setCategorie}

                    />
                </div>
                <button
                onClick= {this.handelRemoveNote}
                >
                    remove
                </button>
                <div>
                   { this.displayLinkedNotes(expenses.sort((a,b) => (a.sRelevance > b.sRelevance) ? -1: 1)) }
        

                </div>

                <div>
                    <div>


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
    setCategorie: (categorie) => dispatch(setCategorie(categorie))


}) 

export default connect(
    mapStateToProps, 
    mapDispatchToProps)
    (NotesList)
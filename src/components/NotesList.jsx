import { thisTypeAnnotation } from '@babel/types'
import React from 'react'
import { connect  } from 'react-redux' 
import { Link } from 'react-router-dom'
import {removeExpense} from '../actions/notes'
import { getAllExpenses } from '../selectors/notes'


class NotesList extends React.Component {
    constructor (props) {
        super(props)
        this.state= {
            id: this.props.expenses.id ? this.props.expenses.id : "pups", 
            // description: 
            allExpenses:  this.props.expenses.sort((a,b) => (a.sRelevance > b.sRelevance) ? 1: -1),
            activeNote: this.props.expenses.description ? this.props.expenses.description : "", 

        }
    }

    handelRemoveNote = () => {
        this.props.removeExpense ({id: this.state.activeNote.id})
    }

    setActiveNote = (expense) => {
        this.setState({activeNote : expense})
        console.log("Active Note: " , this.state.activeNote)
    }

displayLinkedNotes = ( expenses = this.state.allExpenses) => 
expenses.map(expense => (
  <li
    key={expense.id}  
    onClick ={() => this.setActiveNote(expense)}
    > 
       # {expense.sRelevance} {"--" } {expense.description}
    </li>
  ))



getVisibleNotes = (allExpenses = this.props.expenses) => allExpenses.sort((a,b)=>{
        return a.sRelevance <b.sRelevance ? 1: -1
    })

    render (){
        const {allExpenses} = this.state
        return (
     
            <div>
                <button
                onClick= {this.handelRemoveNote}
                >
                    remove
                </button>
                <div>
                   { this.displayLinkedNotes() }
        

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
        expenses : getAllExpenses(state)
    }
}

const mapDispatchToProps =(dispatch) =>({
    removeExpense: (id) => dispatch(removeExpense(id))
}) 

export default connect(
    mapStateToProps, 
    mapDispatchToProps)
    (NotesList)
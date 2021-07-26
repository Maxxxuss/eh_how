import React from 'react'
import { connect  } from 'react-redux' 
import { setCategorie } from '../actions/categorie'
import {removeExpense, addExpense, editExpense, changeStatus} from '../actions/notes'
import { getAllCategories } from '../selectors/categories'
import { getAllExpenses } from '../selectors/notes'
import AddNotes from './AddNotes'
import DropDownCategorie from './DropDownCategorie'
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
            doneDate:"", 
            noteStatus: this.props.expenses ? "open" : "closed"
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


    displayLinkedNotes = (expenses ) => 
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

displayMetaData = () => {
    
    const {activeNote, description, noteDecscription, important, relevance } = this.state
        return (
                <div >
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

                   

                </div>
        )
    }

    statusChange = () => {
        const noteStatus = "closed"
        const updates = {noteStatus}

        this.props.editExpense (this.state.activeNote.id, updates)

    }

    changDisplayNotesOnStateus = () => {
        if (this.state.noteStatus === "open") {
            this.setState(()=>({noteStatus:"closed"}))

        } else {
            this.setState(()=>({noteStatus:"open"})) 
        }
    }




    render (){
        const {filteredExp, description, relevance,important, noteDecscription, activeNote, datesToFinish} = this.state
        const {expenses, categories} = this.props
        return (
     
            <div>


                <div>
                    <AddNotes 
                    addExpense = {this.props.addExpense}
                    categories = {this.props.categories}
                    setCategorie = {this.props.setCategorie}
                    activeCategorie = {this.state.activeCategorie}

                    />
                </div>
                <div>
                    <button
                    onClick = {this.changDisplayNotesOnStateus}
                    >
                        show:  {this.state.noteStatus}
                    </button>
                </div>

                <div className = "categorie" >
                    {this.displayCategories(categories)}
                </div>

               
                <div>
                    <div className="box">

                        {this.displayLinkedNotes(expenses.filter(expense => expense.noteStatus === this.state.noteStatus))}

                    </div>

                    <div className="box">
                        <DropDownCategorie
                           activeNote ={activeNote}

                        />

                            <ShowEditNotes 
                            
                            activeNote ={activeNote}
                            relevance = {relevance}
                            important = {important}
                            noteDecscription = {noteDecscription}
                        description = {description}
                        datesToFinish = {datesToFinish}


                            editExpense = {this.props.editExpense}
                            />
                    </div>
                    
                </div>
                    <button
                        onClick= {this.handelRemoveNote}
                        >
                            remove Note
                        </button>
                <div>
                    <button
                    onClick = {this.statusChange}
                    >
                        change Status 
                    </button>
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
    changeStatus: (id, updates) => dispatch(changeStatus(id, updates)), 


}) 

export default connect(
    mapStateToProps, 
    mapDispatchToProps)
    (NotesList)
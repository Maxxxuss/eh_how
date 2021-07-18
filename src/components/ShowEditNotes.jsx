import React from "react"
import { connect  } from 'react-redux' 
import { editExpense } from "../actions/notes"
import { getAllExpenses } from "../selectors/notes"


 export default class ShowEditNotes extends React.Component {
        constructor(props){
            super(props)
        this.state = {
            // description: this.props.activeNote ? this.props.activeNote.description : "",
            // description: props.activeNote.description,
            description: "", 
            noteDecscription: "note DEs Def", 
            relevance:"",
            priority :"",
            createdAt:"",
            activeNote: ""

        }}


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

    // onSubmit =(updates) => {
    //     updates.preventDefault()
    //     console.log("Shwo EDit Notes - state Description: ", this.state.description)

    //     this.props.editExpense({
    //         description: this.state.description,
    //         relevance: this.state.relevance,
    //         priority: this.state.priority,
    //         noteDecscription: this.state.noteDecscription,
    //         createdAt: this.state.createdAt.valueOf(),
    //     })
    // }
    onSubmit = () => {
        const description = [] ? this.props.activeNote.description : this.state.description
        // const description = this.state.description 
        const relevance= this.state.relevance
        const priority= this.state.priority
        const noteDecscription= this.state.noteDecscription

        const updates =  {description, relevance, priority, noteDecscription}
        // const updates = {
        //     description: "" ? this.props.activeNote.description : this.state.description
        // }


        // this.props.editExpense(this.props.activeNote.id, updates)
        // console.log("edit Expense: ", this.props.activeNote.id, updates);
        console.log(updates)
       
    }

    render () {
        const {description, noteDecscription, priority, relevance} = this.state
        const {activeNote} = this.props
        return (
            <div>
                <div>
                    {/* <form onSubmit={this.onSubmit} > */}
                  <input
                     type="text"
                    placeholder=  "Beschreibung"
                    value={ description ? description : activeNote.description}
                    // value = {description}
                    onChange={this.onDescriptionChange}

                    />
                      <input
                     type="text"
                    placeholder="Relevance"
                    
                    // value={relevance ? relevance : activeNote.relevance}
                    onChange={this.onRelevanveChange}
                    /> 
                     <input
                    type="text"
                   placeholder="Priority"
                //    value={priority ? priority : activeNote.priority}
                   onChange={this.onPriorityChange}
                   />
                   <textarea 
                   placeholder= "NoteDescription"
                //    value= {noteDecscription ? noteDecscription : activeNote.noteDecscription }
                   onChange= {this.onNoteDescriptionChange}
                   />
                   <button
                   onSubmit = {this.onSubmit}
                   >Take Changes</button>
                   {/* </form> */}

                </div>
            </div>


        )
    }


}


// const mapStateToProps = (state)=>{
//     return{
//         expenses : getAllExpenses(state).sort((a,b) => (a.sRelevance > b.sRelevance) ? -1: 1),
//         activeNote : getAllExpenses(state)
        
//     }
// }

// const mapDispatchToProps =(dispatch) =>({
//     editExpense: (id, updates) => dispatch(editExpense(id, updates)), 


// }) 

// export default connect(
//     mapStateToProps, 
//     mapDispatchToProps)
//     (ShowEditNotes)
import moment from "moment"
import React from "react"
import { isNextDay } from "react-dates"
import { connect  } from 'react-redux' 
import { editExpense } from "../actions/notes"
import { getAllExpenses } from "../selectors/notes"

export default class ShowEditNotes extends React.Component {
        
        state = {
            // description: this.props.activeNote ? this.props.activeNote.description : "",
            // description: props.activeNote.description,
            description: "", 
            noteDecscription: "",
            relevance:"",
            important :"",
            datesToFinish:"",
            activeNote: ""

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
    onimportantChange = (e) =>{
        const important = e.target.value
        this.setState(()=>({important}))
    }
    onDateChange = (datesToFinish) => {
        this.setState(()=> ({datesToFinish}))
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
    //         important: this.state.important,
    //         noteDecscription: this.state.noteDecscription,
    //         datesToFinish: this.state.datesToFinish.valueOf(),
    //     })
    // }
    onSubmit = () => {
        const description = this.state.description ? this.state.description : this.props.description
        const relevance= this.state.relevance ? this.state.relevance : this.props.relevance
        const important= this.state.important ? this.state.important : this.props.important
        const noteDecscription= this.state.noteDecscription ? this.state.noteDecscription : this.props.noteDecscription

        const updates =  {description, relevance, important, noteDecscription}
       


        this.props.editExpense(this.props.activeNote.id, updates)
        console.log("edit Expense: ", this.props.activeNote.id, updates);
       
    }

    render () {
        const {description, noteDecscription, important, relevance, datesToFinish} = this.state
        const {activeNote} = this.props
        return (
            <div>
                <div>
                    {/* <form onSubmit={this.onSubmit} > */}
                  <input
                     type="text"
                    placeholder=  "Beschreibung"
                    value = {description ? description: this.props.description}
                    onChange={this.onDescriptionChange}

                    />
                      <input
                     type="text"
                    placeholder="Relevance"
                    value = {relevance ? relevance : this.props.relevance} 
                    onChange={this.onRelevanveChange}
                    /> 
                     <input
                    type="text"
                   placeholder="important"
                   value = {important ? important : this.props.important}
                   onChange={this.onimportantChange}
                   />
                  <input
                    type="text"
                   placeholder="Finish Till"
                   value = {datesToFinish ? datesToFinish :  moment(this.props.datesToFinish).endOf('day').fromNow() }
                   onChange={this.onimportantChange}
                   />

                   <textarea 
                   placeholder= "NoteDescription"
                   value = {noteDecscription ? noteDecscription : this.props.noteDecscription}
                   onChange= {this.onNoteDescriptionChange}
                   />

                   <button
                   onClick = {this.onSubmit}
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


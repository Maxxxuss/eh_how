import moment from "moment"
import React from "react"
import { isNextDay } from "react-dates"
import { connect  } from 'react-redux' 
import { editExpense } from "../actions/notes"
import { getAllExpenses } from "../selectors/notes"
import DropDownCategorie from "./DropDownCategorie"

export default class ShowEditNotes extends React.Component {
    constructor(props){
        super(props)
    this.state = {
            // description: this.props.activeNote ? this.props.activeNote.description : "",
            // description: props.activeNote.description,
            description:  this.props.description,  
            noteDecscription: "",
            relevance:"",
            important :"",
            datesToFinish: this.props.datesToFinish ? this.props.datesToFinish : "", 
            activeNote: "",
            categorie:"", 

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
    onimportantChange = (e) =>{
        const important = e.target.value
        this.setState(()=>({important}))
    }
    onDateChange = (e) => {
        const datesToFinish = new Date(new Date().getTime()+(e.target.value*24*60*60*1000));

        this.setState(()=>({datesToFinish}))
        console.log(this.state.datesToFinish);
    }

    onCategorieChange = (e) => {
        const categorie = e.target.value
        this.setState(()=>({categorie}))
    }

    // updateDescription(event) {
    //     this.props.updateDesctiptriptionnt.target.value;
    //   }

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
    onSubmitChanges = (e) => {
        e.preventDefault()
        const description = this.state.description ? this.state.description : this.props.description
        const relevance= this.state.relevance ? this.state.relevance : this.props.relevance
        const important= this.state.important ? this.state.important : this.props.important
        const noteDecscription= this.state.noteDecscription ? this.state.noteDecscription : this.props.noteDecscription

        const updates =  {description, relevance, important, noteDecscription}
       


        this.props.editExpense(this.props.activeNote.id, updates)
        console.log("edit Expense: ", this.props.activeNote.id, updates);

        const activeNote = this.props.activeNote
 
        this.setState({
            description: "",
            relevance: "",
            important: "",
            NoteDescription: "",
            categorie: "",
            datesToFinish: "",
        })
       
    }

    onSubmitAddNote = (e) => {
        e.preventDefault()
        this.props.addExpense({
            description: this.state.description,
            relevance: this.state.relevance,
            important: this.state.important,
            noteDecscription: this.state.noteDecscription,
            // datesToFinish: this.state.datesToFinish.valueOf(),
            categorie: this.props.activeCategorie ? this.props.activeCategorie.id : undefined,
            datesToFinish: this.state.datesToFinish
        })

        // this.setStateToZero()

        this.setState({
            description: "",
            relevance: "",
            important: "",
            NoteDescription: "",
            categorie: "",
            datesToFinish: "",
        })

        
      
        console.log("Important State", this.state.important);
    }

    dateFormater = (datesToFinish) => {

        // const date = moment(datesToFinish).format("ddd - DD.MM.YY")
        const date = moment(datesToFinish).endOf('day').fromNow()

        return date
    }

    dateVAlue = ( ) => {
        const dates = this.state.datesToFinish
        const propDates = this.props.datesToFinish
        if (dates != "" ) {
            return moment(dates).format("ddd - DD.MM.YY")
        }
         if (propDates != "" ) {
            return moment(propDates).format("ddd - DD.MM.YY")     
        }
        else {
            return moment().format("ddd - DD.MM.YY")
        }
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
                    // value = {description ? description : this.props.description}
                    value = {description}
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
                //    value = {this.dateFormater(datesToFinish) ? this.dateFormater(datesToFinish)  :  this.dateFormater(this.props.datesToFinish) }
                //    value = {datesToFinish ? datesToFinish :  moment(this.props.datesToFinish).endOf('day').fromNow() }
                value={this.dateVAlue()}
                   onChange={this.onDateChange}
                   />

                   <textarea 
                   placeholder= "NoteDescription"
                   value = {noteDecscription ? noteDecscription : this.props.noteDecscription}
                   onChange= {this.onNoteDescriptionChange}
                   />
                    <p>
                       datesToFinish:  {moment(datesToFinish).format("ddd - DD.MM.YY")}
                   </p>

                   <button
                   onClick = {this.onSubmitChanges}
                   >Take Changes</button>

                   <button
                   onClick = {this.onSubmitAddNote}
                   > Add Note </button>


                </div>

            </div>
        )
    }

}

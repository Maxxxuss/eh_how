import React from 'react'
import moment from 'moment'
// import {SingleDatePicker} from "react-dates"
import 'react-dates/initialize';
import { parse } from 'uuid';
import { locCache, setLocalStorageState} from '../store/configureStore';
import { Header } from 'semantic-ui-react';



export default class AddNotes extends React.Component {
    constructor(props){
        super(props)
    this.state = {
        description: "",
        relevance:"",
        important:"",
        noteDecscription:"",
        // datesToFinish: moment(),
        datesToFinish:  "" , 
        calenderFocused: false, 
        categorie: "",

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

    onFucusChange = ({foucused}) => {
        this.setState(()=>({calenderFocused:foucused}))
    }

    onCategorieChange = (e) => {
        const categorie = e.target.value
        this.setState(()=>({categorie}))
    }
 
    onSubmit = (expense) => {
        expense.preventDefault()
        this.props.addExpense({
            description: this.state.description,
            relevance: this.state.relevance,
            important: this.state.important,
            noteDecscription: this.state.noteDecscription,
            datesToFinish: this.state.datesToFinish.valueOf(),
            categorie: this.props.activeCategorie ? this.props.activeCategorie.id : undefined,
            datesToFinish: this.state.datesToFinish
        })
        console.log("Important State", this.state.important);
    }

    onCategorieSubmit = (categorie) =>{
        categorie.preventDefault()
        this.props.setCategorie ({
            catName: this.state.categorie, 
            details: ""
            
        })
        console.log("Submit pressed ", this.state.categorie);
    }

    onLocalStorage = (filename, text = locCache()) => {
            var blob = new Blob([text], {type: "text/plain"});
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.click();
          }


    render () {
        const {datesToFinish} = this.state
        return (
            <div className="addNotesComponent">



                <div
                className="addCategorie"

                >
                    
                  <input
 
                    tpye= "text"
                    placeholder = "categorie"
                    value= {this.state.categorie}
                    onChange = {this.onCategorieChange}
                    />


                    <button
                    onClick = {this.onCategorieSubmit}
                    >Add Categorie
                    </button>
                </div>
        
            <div className="addNotes">
                <form onSubmit={this.onSubmit}>
                    <input
                     type="text"
                    placeholder="Bescheribung"
                    autoFocus
                    value={this.state.description}
                    onChange={this.onDescriptionChange}

                    />
                      <input
                      className= "addInput"
                     type="text"
                    placeholder="Relevance"
                    
                    value={this.state.relevance}
                    onChange={this.onRelevanveChange}
                    /> 
                     <input
                    type="text"
                   placeholder="important"
                   value={this.state.important}
                   onChange={this.onimportantChange}
                   />

                   <input 
                   type = "text"
                   placeholder = "F-In "
                //    value = {this.state.datesToFinish}
                   onChange = {this.onDateChange}
                   />

                   <p>
                       datesToFinish:  {moment(datesToFinish).format("ddd - DD.MM.YY")}
                   </p>

                   <input 
                   type = "text"
                   placeholder = "Categorie"

                   />
              

                   <textarea 
                   placeholder= "NoteDescription"
                   value= {this.state.noteDecscription}
                   onChange= {this.onNoteDescriptionChange}
                   >
                       

                   </textarea>
                   <button>Add Notes</button>


                </form>




                </div>
            </div>

        )
    }
}

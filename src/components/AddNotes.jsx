import React from 'react'
import moment from 'moment'
import {SingleDatePicker} from "react-dates"
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import { connect } from 'react-redux'



export default class AddNotes extends React.Component {
    constructor(props){
        super(props)
    this.state = {
        description: "",
        relevance:"",
        priority:"",
        noteDecscription:"",
        createdAt: moment(),
        calenderFocused: false, 
        categorie: "",
        activeCategorie: "", 

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
            priority: this.state.priority,
            noteDecscription: this.state.noteDecscription,
            createdAt: this.state.createdAt.valueOf(),
            
        })
    }

    onCategorieSubmit = (categorie) =>{
        categorie.preventDefault()
        this.props.setCategorie ({
            catName: this.state.categorie, 
            details: ""
            
        })
        console.log("Submit pressed ", this.state.categorie);
    }

    displayCategories = (categories) => 
        categories.map(categorie => (

            <li
                key = {categorie.id}
                onClick ={() => this.setActiveCategorie(categorie)}

                >
            {categorie.catName}

            </li>
        ),
        console.log("AddMotes Categorie:", categories)
        )

    setActiveCategorie = (categorie) => {
        
        this.setState({activeCategorie : categorie})
        console.log("active Kategoei", this.state.activeCategorie.catName);


    }

    


  

    render () {
        const {categories} = this.props
        return (
            <div>
                <div>
                {this.displayCategories(categories)}


                </div>
                

                <div>
                    
                  <input 
                   tpye= "text"
                   placeholder = "categorie"
                   value= {this.state.categorie}
                   onChange = {this.onCategorieChange}
                   />
                   <button
                   onClick = {this.onCategorieSubmit}
                   >Add Categorie</button>
                </div>

                
            <div>
                <form onSubmit={this.onSubmit}>
                    <input
                     type="text"
                    placeholder="Bescheribung"
                    autoFocus
                    value={this.state.description}
                    onChange={this.onDescriptionChange}

                    />
                      <input
                     type="text"
                    placeholder="Relevance"
                    
                    value={this.state.relevance}
                    onChange={this.onRelevanveChange}
                    /> 
                     <input
                    type="text"
                   placeholder="Priority"
                   value={this.state.priority}
                   onChange={this.onPriorityChange}
                   />
              
                   {/* <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calenderFocused}
                    onFocusChange={this.onFucusChange}
                    // id="seqwe2e1n"
                    /> */}

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

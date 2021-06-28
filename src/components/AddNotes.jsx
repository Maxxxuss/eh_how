import React from 'react'
import moment from 'moment'
import {SingleDatePicker} from "react-dates"
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';




export default class NotesForm extends React.Component {
    constructor(props){
        super(props)
    this.state = {
        description: "",
        relevance:"",
        priority:"",
        noteDecscription:"",
        createdAt: moment(),
        calenderFocused: false, 

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
 
    onSubmit = (e) => {
        e.preventDefault()
        this.props.onSubmit({
            description: this.state.description,
            relevance: this.state.relevance,
            priority: this.state.priority,
            noteDecscription: this.state.noteDecscription,
            createdAt: this.state.createdAt.valueOf()

        })
    }

    render () {
        return (
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
                   <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calenderFocused}
                    onFocusChange={this.onFucusChange}
                    // id="seqwe2e1n"
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

        )
    }
}


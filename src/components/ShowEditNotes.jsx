import React from "react"

export default class ShowEditNotes extends React.Component {
        
        state = {
            // description: this.props.activeNote ? this.props.activeNote.description : "",
            description:[] ? this.props.activeNote.description : "", 
            noteDecscription: "",
            relevance:"",
            priority :"",
            createdAt:"",
            activeNote: this.props.activeNote ? this.props.activeNote : ""

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
        const description = this.state.description
        const relevance= this.state.relevance
        const priority= this.state.priority
        const noteDecscription= this.state.noteDecscription

        const updates =  {description, relevance, priority, noteDecscription}


        this.props.editExpense(this.props.activeNote.id, updates)
        console.log("edit Expense: ", this.props.activeNote.id, updates);

       
    }

    render () {
        const {activeNote} = this.props
        return (
            <div>
                <div>
                    {/* <form onSubmit={this.onSubmit} > */}
                  <input
                     type="text"
                    placeholder= {this.props.activeNote ? this.props.activeNote.description : "Beschreibung"}
                    value={ this.state.description}
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
                   <textarea 
                   placeholder= "NoteDescription"
                   value= {this.state.noteDecscription}
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
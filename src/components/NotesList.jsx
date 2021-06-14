import React from 'react'
import { connect  } from 'react-redux' 


const NotesListItem = ({description, amount, createdAt}) =>(
    <div>
        <h3>{description}</h3>
        <p> {amount} - {createdAt} </p>


    </div>
)

const NotesListFilter = () => (
    <div>
        <input type="text" placeholder="Filter" />
    </div>
)


const NotesList =(props) => (
    <div>

        <h1>Notes Liste</h1>
        {props.expenses.length}

        {props.expenses.map ((expense)=> {
            return <NotesListItem key={expense.id} {...expense}/>
        })}


         
    </div>
)

const mapStateToProps = (state)=>{
    return{

        expenses : state.expenses
    }
}

export default connect(mapStateToProps)(NotesList)
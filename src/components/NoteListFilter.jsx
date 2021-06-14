import React from 'react'
import { connect  } from 'react-redux' 
import { setTextFilter } from '../actions/filters'




const NotesListFilter = (props) => (
    <div>
        <input type="text"
         placeholder="Filter" 
         onChange ={(e)=>{props.dispatch(setTextFilter(e.target.value)) }}
        
         /> 
    </div>
)

const mapDispatchToProps () => {

}

connect (mapDispatchToProps) (NotesListFilter)
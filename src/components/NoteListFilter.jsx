import React from 'react'
import { connect  } from 'react-redux' 
import { setTextFilter, sortByAmount, sortByDate} from '../actions/filters'




const NotesListFilter = (props) => (
    <div>
        <input type="text"
         placeholder="Filter" 
         value = {props.filters.text}
         onChange ={(e)=>{props.dispatch(setTextFilter(e.target.value))
         }}
        // onChange = {(e)=>(
        //     prop.dispatch(setTextFilter(e.target.value))
        //     console.log(e.target.value))}
         /> 
         <select
         value={props.filters.sortBy}
         onChange={(e)=>{
             if (e.target.value ==='date'){
                 props.dispatch(sortByDate())
             } else if (e.target.value ==='amount'){
                 props.dispatch(sortByAmount())
             }
         }}
         >
             <option value="date" >  Date</option>
             <option value="amount"> amount</option>

         </select>
    </div>
)

const mapDispatchToProps = (state) => {
return{
    filters: state.filters
}
}

export default connect (mapDispatchToProps) (NotesListFilter)
import React from 'react'
import { connect  } from 'react-redux' 
import { setTextFilter, sortByRelevance, sortByDate} from '../actions/filters'




const NotesListFilter = (props) => (
    <div>
        <input type="text"
         placeholder="Filter" 
         value = {props.filters.text}
         onChange ={(e)=>{props.dispatch(setTextFilter(e.target.value))
         }}
         /> 
         <select
         value={props.filters.sortBy}
         onChange={(e)=>{
             if (e.target.value ==='date'){
                 props.dispatch(sortByDate())
             } else if (e.target.value ==='sRelevance'){
                 props.dispatch(sortByRelevance())
             }
         }}
         >
             <option value="sRelevance"> Relevance</option>
             <option value="date"> Date</option>

         </select>
    </div>
)

const mapDispatchToProps = (state) => {
return{
    filters: state.filters
}
}

export default connect (mapDispatchToProps) (NotesListFilter)
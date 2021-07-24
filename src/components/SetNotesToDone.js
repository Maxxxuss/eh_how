import React from "react";
import { connect  } from 'react-redux' 

import {changeStatus} from '../actions/notes'

export default class SetNoteToDone extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            activeNote: "", 
            noteStatus: "",
        }
    }
    statusChange = (activeNote) => {

        this.props.changeStatus ({id: this.state.activeNote.id})

    }


    render () {
        const {activeNote } = this.state
        return (
            <button>
                
            </button>
          
        )
    }
}

const mapStateToProps = (state) => {
    return{

    }
}

const mapDispatchToProps = (dispatch) =>( {
    changeStatus: (id, updates) => dispatch(changeStatus(id, updates))


})

export default connect(
    null, 
    mapDispatchToProps)
    (SetNoteToDone)
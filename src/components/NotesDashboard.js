import React from 'react'
import NotesList from './NotesList'
import { connect } from 'react-redux'
import store from '../store/configureStore'

import ImpExpData from './ImpExpData'


const NotesDashboardPage = (props) => (
    <div>
        <NotesList/>
        <ImpExpData/>

    </div>
)
console.log(store.getState());



export default connect( ) (NotesDashboardPage)

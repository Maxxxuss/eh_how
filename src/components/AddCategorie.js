import React from 'react'
import moment from 'moment'
// import {SingleDatePicker} from "react-dates"
import 'react-dates/initialize';
import { parse } from 'uuid';
import { locCache, setLocalStorageState} from '../store/configureStore';
import { Header } from 'semantic-ui-react';



export default class AddCategorie extends React.Component {
    constructor(props){
        super(props)
    this.state = {
         categorie: "",
    }}


    onCategorieChange = (e) => {
        const categorie = e.target.value
        this.setState(()=>({categorie}))
    }


    onCategorieSubmit = (categorie) =>{
        categorie.preventDefault()
        this.props.setCategorie ({
            catName: this.state.categorie, 
            details: ""
            
        })
        console.log("Submit pressed ", this.state.categorie);
    }



    render () {
        return (
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

        )
    }
}

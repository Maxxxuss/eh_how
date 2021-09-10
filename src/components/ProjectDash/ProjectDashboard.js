
import React from "react"
import { connect } from 'react-redux'
import { setCategorie, editCategorie, removeCategorie } from '../../actions/categorie'
import { getAllCategories, getCategories, getHistorieCategorie } from '../../selectors/categories'
import {getAllExpenses} from "../../selectors/notes"
import {
    Button,
    ButtonGroup,
    List,
    TextField,
    Link,

} from "@material-ui/core"
import ProjectTabPanelDetails from "./ProjectTapPanelDetails"

class ProjectDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            catName: "",
            details: "",
            catID: "",
            m1: "",
            m2: "",
            m3: "",
            m4: "",
            aktStand: "",
            nextSteps: "",
            challenges: "",
            journal: "",
            noteUpdateDate:"", 
            sorting:"",

            activeCategorie: "",
            actHistroyCategorie: ""

        }
    }

    onCatIDChange = (e) => {
        const catID = e.target.value
        this.setState(() => ({ catID }))
    }
    onCatNameChange = (e) => {
        const catName = e.target.value
        this.setState(() => ({ catName }))
    }
    onM1Cahnge = (e) => {
        const m1 = e.target.value
        this.setState(() => ({ m1 }))
    }
    onM2Cahnge = (e) => {
        const m2 = e.target.value
        this.setState(() => ({ m2 }))
    }
    onM3Cahnge = (e) => {
        const m3 = e.target.value
        this.setState(() => ({ m3 }))
    }
    onM4Cahnge = (e) => {
        const m4 = e.target.value
        this.setState(() => ({ m4 }))
    }
    onJournalChange = (e) => {
        const journal = e.target.value
        this.setState(() => ({ journal }))
    }
    onChangeSorting = (e) => {
        const sorting = e.target.value
        this.setState(() => ({ sorting }))
    }



    setActiveCategorie_HisCat = (categorie ) => {
       
        //SetUp ActHistory 
        const catID = categorie.id
        const hisCat = this.props.historyCategorie
        const activeHisCat = hisCat.filter(fHisCat => fHisCat.hid == catID)


        this.setActiveCategorie(categorie, activeHisCat)
 
    }


    setActiveCategorie = (categorie, activeHisCat ) => {
        this.setState({
            catName: categorie.catName,
            details: categorie.details,
            catID: categorie.catID,
            m1: categorie.m1,
            m2: categorie.m2,
            m3: categorie.m3,
            m4: categorie.m4,

            aktStand: categorie.aktStand,
            nextSteps: categorie.nextSteps,
            challenges: categorie.challenges,
            journal: categorie.journal,

            activeCategorie: categorie,
            
            actHistroyCategorie : activeHisCat[0]

        })
    }


    displayCategories = (categories) =>
        categories.map(categorie => (
            <li
                className="noteListStylProjectDas"
                key={categorie.id}
                onClick={() => this.setActiveCategorie_HisCat(categorie)}
                style={{
                    listStyleType: "none"
                }}
            >
                 <TextField
                    label="Sort"
                    value={categorie.sorting}
                onChange={this.onChangeSorting}
                >
                </TextField>

                <TextField
                    className="projectDasTextfield"
                    label="Project ID"
                    value={categorie.catID}
                    onChange={this.onCatIDChange}
                // inputProps={{
                //     style: {
                //         fontSize: 16,
                //     }
                // }}
                >
                </TextField>

                <TextField
                    label="Projekt Name"
                    value={categorie.catName}
                    onChange={this.onCatNameChange}
                >
                </TextField>

                <TextField
                    label="M1 - P.-Start"
                    value={categorie.m1}
                    onChange={this.onM1Cahnge}
                >
                </TextField>

                <TextField
                    label="M2 - Start Rea."
                    value={categorie.m2}
                    onChange={this.onM2Cahnge}
                >
                </TextField>
                <TextField
                    label="M3 - Ende Rea."
                    value={categorie.m3}
                    onChange={this.onM3Cahnge}
                >
                </TextField>
                <TextField
                    label="M4 - P.- Ende"
                    value={categorie.m4}
                    onChange={this.onM4Cahnge}
                >
                </TextField>
               
            </li>

        ))


    render() {
        const { categories } = this.props
        const { catName, details, catID, m1, m2, m3, m4, aktStand, nextSteps, challenges, journal } = this.state

        return (
            <div>
                <Link href="/"
                    style={{
                        backgroundColor: "yellow",
                        padding: "20",
                    }}>
                    Task Dashboard
                </Link>
                <div>

                    <h1>Project Dashboard</h1>

                </div>


                <div className="proBox"
                >

                    <div
                        className="proBoxItems"

                    >
                        <div
                            className="boxProjectdDash"
                        >
                            {this.displayCategories(categories)}
                        </div>

                    </div>

                    <div
                        className="proBoxItems"
                    >
                        <h3>
                            Project Details
                        </h3>

                        <ProjectTabPanelDetails
                            activeCategorie={this.state.activeCategorie}
                            setCategorie={this.props.setCategorie}
                            editCategorie={this.props.editCategorie}
                            removeCategorie={this.props.removeCategorie}
                            journalExpenses={this.props.journalExpenses}
                            actHistroyCategorie={this.state.actHistroyCategorie}
                        />

                    </div>
                </div>

            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        categories: getAllCategories(state),
        journalExpenses: (getAllExpenses(state).sort((a, b) => (a.noteUpdateDate > b.noteUpdateDate) ? -1 : 1)).filter(expense => expense.journalNote === true),
        historyCategorie: getHistorieCategorie(state)

    }
}

const mapDispatchToProps = (dispatch) => ({
    setCategorie: (categorie) => dispatch(setCategorie(categorie)),
    removeCategorie: (id) => dispatch(removeCategorie(id)),
    editCategorie: (id, updates) => dispatch(editCategorie(id, updates)),

    removeExpense: (id) => dispatch(removeExpense(id)),
    addExpense: (expense) => dispatch(addExpense(expense)),
    editExpense: (id, updates) => dispatch(editExpense(id, updates)),

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)
    (ProjectDashboard)





import React from "react"
import { connect } from 'react-redux'
import { setCategorie, editCategorie, removeCategorie } from '../../actions/categorie'
import { getAllCategories, getCategories } from '../../selectors/categories'
import {
    Button,
    ButtonGroup,
    List,
    TextField,
    Link,

} from "@material-ui/core"

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

            activeCategorie: "",

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


    setActiveCategorie = (categorie) => {
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

        })
    }





    addCategorie = () => {
        this.props.setCategorie({


            catName: this.state.catName,
            details: this.state.details,
            catID: this.state.catID,
            m1: this.state.m1,
            m2: this.state.m2,
            m3: this.state.m3,
            m4: this.state.m4,
            aktStand: this.state.aktStand,
            nextSteps: this.state.nextSteps,
            challenges: this.state.challenges,
            journal: this.state.journal,


        })
        console.log("categorie added");

    }
    clearProjDetails = () => {
        this.setState({
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
        })

    }

    removeProject = () => {
        const activeCategorie = this.state.activeCategorie

        this.props.removeCategorie({
            id: activeCategorie.id
        })

    }

    changeCategorieDetails = () => {


        const catName = this.state.catName
        const details = this.state.details
        const catID = this.state.catID
        const m1 = this.state.m1
        const m2 = this.state.m2
        const m3 = this.state.m3
        const m4 = this.state.m4
        const aktStand = this.state.aktStand
        const nextSteps = this.state.nextSteps
        const challenges = this.state.challenges
        const journal = this.state.journal

        const updates = { catName, details, catID, m1, m2, m3, m4, aktStand, nextSteps, challenges, journal }


        this.props.editCategorie(this.state.activeCategorie.id, updates)
    }



    displayCategories = (categories) =>
        categories.map(categorie => (
            <li
                className="noteListStylProjectDas"
                key={categorie.id}
                onClick={() => this.setActiveCategorie(categorie)}
            >

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
                <TextField
                    label="Proj.- Journal"
                    value={categorie.journal}
                // onChange={this.onChange}
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
                    <ButtonGroup
                        variant="contained"
                        size="small"
                    >
                        <Button
                            color="primary"
                            onClick={this.addCategorie}
                        >
                            Add
                        </Button>
                        <Button
                            onClick={this.changeCategorieDetails}
                        >
                            Take Changes
                        </Button>
                        <Button
                            onClick={this.clearProjDetails}
                        >
                            clear
                        </Button>
                        <Button
                            color="secondary"
                            onClick={this.removeProject}

                        >
                            Remove
                        </Button>
                    </ButtonGroup>

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
                        <div>

                            <TextField

                                label="Project ID"
                                value={catID}
                                onChange={this.onCatIDChange}
                            >
                            </TextField>

                            <TextField

                                label="Projekt Name"
                                value={catName}
                                onChange={this.onCatNameChange}
                            >
                            </TextField>

                            <TextField

                                label="M1 - P.-Start"
                                value={m1}
                                onChange={this.onM1Cahnge}
                            >
                            </TextField>

                            <TextField
                                label="M2 - Start Rea."
                                value={m2}
                                onChange={this.onM2Cahnge}
                            >
                            </TextField>
                            <TextField
                                label="M3 - Ende Rea."
                                value={m3}
                                onChange={this.onM3Cahnge}
                            >
                            </TextField>
                            <TextField
                                label="M4 - P.- Ende"
                                value={m4}
                                onChange={this.onM4Cahnge}
                            >
                            </TextField>

                            <div>
                                <TextField
                                    variant="outlined"
                                    label="Project Journal"
                                    value={journal}
                                    onChange={this.onJournalChange}
                                    margin="dense"
                                    multiline
                                    fullWidth


                                    inputProps={{
                                        style: {
                                            marginTop: 20,
                                            padding: 2,
                                            height: 200,
                                            width: 300,

                                            lineHeight: 1.5,
                                        }
                                    }}
                                >
                                </TextField>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        categories: getAllCategories(state),
    }
}

const mapDispatchToProps = (dispatch) => ({
    setCategorie: (categorie) => dispatch(setCategorie(categorie)),
    removeCategorie: (id) => dispatch(removeCategorie(id)),
    editCategorie: (id, updates) => dispatch(editCategorie(id, updates)),

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)
    (ProjectDashboard)




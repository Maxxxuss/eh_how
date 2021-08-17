
import React from "react"
import { connect } from 'react-redux'
import { setCategorie, removeCategorie } from '../../actions/categorie'
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
            m1: "m1 Meilenstein",
            m2: "m2 Meilenstein",
            m3: "",
            m4: "",
            aktStand: "",
            nextSteps: "",
            challenges: "",
            journal: "",

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



        })
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
                    label="Proj.- Details"
                    value={categorie.details}
                    onChange={this.onChange}
                >
                </TextField>
            </li>

        ))


    render() {
        const { categories } = this.props
        const { catName, details, catID, m1, m2, m3, m4, aktStand, nextSteps, challenges, journal } = this.state

        return (
            <div>
                <Link href="/taskDash"

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
                        >
                            Add
                        </Button>
                        <Button>
                            Take Changes
                        </Button>
                        <Button
                            color="secondary"
                        >
                            Remove
                        </Button>
                    </ButtonGroup>

                </div>

                <div
                    className="boxProjectdDash"
                >
                    {this.displayCategories(categories)}
                </div>

                <div
                    className="boxProjectdDash"
                >
                    <h3>
                        Project Details
                    </h3>
                    <div>

                        <TextField
                            className="projectDasTextfield"

                            label="Project ID"
                            value={catID}
                            onChange={this.onCatIDChange}
                        >
                        </TextField>

                        <TextField
                            className="projectDasTextfield"

                            label="Projekt Name"
                            value={catName}
                            onChange={this.onCatNameChange}
                        >
                        </TextField>

                        <TextField
                            className="projectDasTextfield"

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
                        <TextField
                            label="Proj.- Details"
                            value={details}
                            onChange={this.onChange}
                        >
                        </TextField>

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

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)
    (ProjectDashboard)



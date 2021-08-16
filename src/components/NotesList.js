import React from 'react'
import { connect } from 'react-redux'
import { setCategorie, removeCategorie } from '../actions/categorie'
import { removeExpense, addExpense, editExpense, changeStatus } from '../actions/notes'
import { getAllCategories, getCategories } from '../selectors/categories'
import { getAllExpenses } from '../selectors/notes'
import AddCategorie from './AddCategorie'
import DropDownCategorie from './DropDownCategorie'
import ShowEditNotes from './ShowEditNotes'
import moment, { relativeTimeRounding } from "moment"
import {
    colors,
    TextField,
    Button,
    Box,
    makeStyles,
    ButtonGroup,
    AppBar,
    Tabs,
    Tab,
    FormControlLabel,
    Switch,
    Grid,
} from '@material-ui/core'
import { red, yellow } from '@material-ui/core/colors'
import DropDownCat from './DopDownCatMat'
import { Autocomplete } from '@material-ui/lab';


class NotesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.expenses.id ? this.props.expenses.id : "pups",
            activeNote: "",
            allExpenses: this.props.expenses,
            activeCategorieCatName: "",
            filteredExp: "",
            description: "",
            noteDecscription: "",
            relevance: "",
            important: "",
            datesToFinish: "",
            categorie: "",
            doneDate: "",
            noteStatus: "",
            tabCategorie: 0,
            information: "",
            activeNoteStatus: "",
            noteListStatus: "open",
            activeCategorieID: "",
            nextStep: "",
        }
    }


    clearShowEditNotes = () => {
        this.setState({
            description: "",
            relevance: "",
            important: "",
            noteDecscription: "",
            datesToFinish: "",
            activeNote: "",
            categorie: "",
            // activeCategorieCatName: "",
            nextStep: "",
        })
    }


    handelRemoveNote = () => {
        this.props.removeExpense({ id: this.state.activeNote.id })
        this.clearShowEditNotes()
    }

    setActiveNote = (expense) => {
        this.setState({ activeNote: expense })
        this.setState({ description: expense.description })
        this.setState({ noteDecscription: expense.noteDecscription })
        this.setState({ relevance: expense.relevance })
        this.setState({ important: expense.important })
        this.setState({ datesToFinish: expense.datesToFinish })
        this.setState({ categorie: expense.categorie })
        this.setState({ activeNoteStatus: expense.noteStatus })
        this.setState({ nextStep : expense.nextStep})


        console.log("Active Note: ", this.state.activeNote.description, this.state.activeNote)
        console.log("setActiveNote Status:", this.state.activeNoteStatus);
    }

    showHintForTimedNotes = (expense) => {
        const datesToFinish = expense.datesToFinish

        var b = moment()
        var a = datesToFinish

        const difference = moment(a).diff(b)
        const days = moment.duration(difference).asDays()
        const daySubStrin = parseInt(days)

        if (days > -1 && days < 0) {
            return (

                <p
                    style={{
                        fontSize: "large",
                        color: "Green",
                        backgroundColor: "ghostWhite"
                    }}
                >
                    Do-Today
                </p>
            )
        }
        if (days < -1) {
            return (
                <p
                    style={{
                        color: "DarkRed",
                        backgroundColor: "Orange"
                    }}
                >
                    "Done till "{daySubStrin} Days
                </p>
            )
        }
        else {
            return (
                <p>
                </p>
            )

        }
    }


    displayNotes = (expenses) =>
        expenses.map(expense => (

            <li
                className="noteListStylInt"
                key={expense.id}
                onClick={() => this.setActiveNote(expense)}
            >
                <div
                    className="noteListStylInt"
                >
                    {Math.round(expense.prio)} {expense.categorie} - {expense.description} - {this.showHintForTimedNotes(expense)}

                    <p>
                        {expense.noteDecscription.substr(16, 80)}

                    </p>

                </div>

            </li>



        ),
            console.log("Notes on DisplNotes", expenses)
        )

    setActiveCategorie = (categorie) => {
        const filteExp = this.props.expenses.filter(expense => expense.categorie === categorie.catName)
        const catFilteExp = filteExp.filter(catExp => catExp.noteStatus === "open")

        this.setState({ filteredExp: catFilteExp })
        this.setState({ activeCategorieCatName: categorie.catName })
        this.setState({ activeCategorieID: categorie.id })

    }

    clearCategorie = () => {
        console.log("categorie State: ", this.state.categorie);
        this.setState({ filteredExp: this.props.expenses.filter(expense => expense.noteStatus === "open") })
        this.displayNotes(this.props.expenses)
        this.setState(() => ({ activeCategorieCatName: "" }))
    }

    updateFilteExp = (noteStatus) => {
        const { activeCategorieCatName } = this.state
        console.log("UpdateFilExp Active Kategorie:", activeCategorieCatName);

        this.setState({ noteStatus: noteStatus }, () => {
            const filteExp = this.props.expenses.filter(expense => expense.categorie === activeCategorieCatName)
            const catFilteExp = filteExp.filter(catExp => catExp.noteStatus === noteStatus)
            this.setState({ filteredExp: catFilteExp })

            console.log("Upodate Filte Exp: ", filteExp);
        })

    }

    statusChange = () => {
        const { activeCategorieCatName } = this.state

        console.log("Status Change activeCategorieCatName:", activeCategorieCatName);


        if (this.state.activeNote.noteStatus === "open") {
            const noteStatus = "closed"
            const updates = { noteStatus }

            this.props.editExpense(this.state.activeNote.id, updates)

            this.updateFilteExp("open")

            console.log("Status Change NoteStatus:", this.state.noteStatus);

            this.clearShowEditNotes()


        } else {
            const noteStatus = "open"
            const updates = { noteStatus }

            this.props.editExpense(this.state.activeNote.id, updates)

            this.updateFilteExp("closed")


            console.log("Else Note Status : ", this.state.noteStatus);



        }
    }

    changDisplayNotesOnStateus = () => {
        const expenses = this.props.expenses
        const noteListStatus = this.state.noteListStatus

        if (noteListStatus === "open") {
            this.setState(() => ({ noteListStatus: "closed" }))
            const filteredExpOPEN = expenses.filter(expense => expense.noteStatus === "closed")

            this.setState(() => ({ filteredExp: filteredExpOPEN }))


        } else {
            this.setState(() => ({ noteListStatus: "open" }))

            const filteredExpCLOSED = expenses.filter(expense => expense.noteStatus === "open")


            this.setState(() => ({ filteredExp: filteredExpCLOSED }))



        }
    }


    // SHOW-Edit NOtes
    onDescriptionChange = (e) => {
        const description = e.target.value
        this.setState(() => ({ description }))
    }
    onNoteDescriptionChange = (e) => {
        const noteDecscription = e.target.value
        this.setState(() => ({ noteDecscription }))
    }
    onRelevanveChange = (e) => {
        const relevance = e.target.value
        this.setState(() => ({ relevance }))
    }
    onimportantChange = (e) => {
        const important = e.target.value
        this.setState(() => ({ important }))
    }
    onDateChange = (e) => {
        const datesToFinish = new Date(new Date().getTime() + (e.target.value * 24 * 60 * 60 * 1000));

        this.setState(() => ({ datesToFinish }))
        console.log(this.state.datesToFinish);
    }

    onCateChange = (e) => {
        const activeCategorieCatName = e.target.value
        this.setState(() => ({ activeCategorieCatName }))
        console.log(this.state.categorie);
    }

    onTabChange = (e, newValue) => {
        const categories = this.props.categories
        const tabCategorie = newValue
        this.setState(() => ({ tabCategorie }))
        console.log("Tab categorei: ", this.state.tabCategorie);
        this.clearShowEditNotes()

    }

    onNoteNextStepChange = (e) => {
        const nextStep = e.target.value
        this.setState(() => ({ nextStep }))
        console.log(this.state.nextStep);

    }



    onSubmitChanges = (e) => {
        e.preventDefault()
        const space = "\n"
        const timeStamp = moment().format("ddd - DD.MM.YY")

        const description = this.state.description
        const relevance = this.state.relevance
        const important = this.state.important
        const notDes = this.state.noteDecscription
        const categorie = this.state.categorie
        const noteDecscription = (space.concat(space, timeStamp, space, notDes, space,))
        const datesToFinish = this.state.datesToFinish
        const nextStep = this.state.nextStep

        const updates = { description, relevance, important, noteDecscription, categorie, datesToFinish, nextStep }

        this.props.editExpense(this.state.activeNote.id, updates)


        const activeNoteStatus = this.state.activeNote.noteStatus

        this.updateFilteExp(activeNoteStatus)
        console.log("edit Expense: ", this.state.activeNote.id, updates);

    }

    onSubmitAddNote = (e) => {
        const space = "\n"
        const timeStamp = moment().format("ddd - DD.MM.YY")
        e.preventDefault()


        this.props.addExpense({
            description: this.state.description,
            relevance: this.state.relevance,
            important: this.state.important,
            noteDecscription: (space.concat(space, timeStamp, space, this.state.noteDecscription)),
            datesToFinish: this.state.datesToFinish,
            categorie: this.state.activeCategorieCatName,
            nextStep: this.state.nextStep

        })
        this.updateFilteExp(this.state.noteListStatus)
        this.clearShowEditNotes()


    }

    dateFormater = (datesToFinish) => {

        const date = moment(datesToFinish).endOf('day').fromNow()

        return date
    }

    dateVAlue = () => {
        const dates = this.state.datesToFinish
        const propDates = this.props.datesToFinish
        if (dates != "") {
            return moment(dates).format("ddd - DD.MM.YY")
        }
        if (propDates != "") {
            return moment(propDates).format("ddd - DD.MM.YY")
        }
        else {
            return moment().format("ddd - DD.MM.YY")
        }
    }

    buttonAddTakeChanges = () => {
        const activeNote = this.state.activeNote

        if (activeNote === "") {
            return (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.onSubmitAddNote}
                > Add Note </Button>
            )
        } else {
            return (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.onSubmitChanges}
                >Take Changes</Button>
            )

        }
    }


    useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: '25ch',
        },
    }));

    useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: '25ch',
        },
    }));

    a11yProps(index) {
        return {
            id: `action-tab-${index}`,
            "aria-controls": `action-tabpanel-${index}`
        };
    }


    ProjectTab = (categories) =>
        categories.map(categorie => (

            <Tab
                key={categorie.id}
                label={categorie.catName}
                onClick={() => this.setActiveCategorie(categorie)}
                style={{
                    fontSize:16,
                  }}
            >
            </Tab>

        ))

    render() {
        const { filteredExp, description, relevance, important, noteDecscription, activeNote, datesToFinish, categorie, tabCategorie, activeCategorieCatName, noteStatus, nextStep } = this.state
        const { expenses, categories } = this.props
        const { children, value, index, ...other } = this.props;


        return (

            <div
                className=""
            >
                <Box
                    mt={2}
                    mb={2}
                    mr={2}
                    ml={2}
                >

                    <AppBar position="static" color="default">
                        <Tabs
                            value={tabCategorie}
                            onChange={this.onTabChange}
                            indicatorColor="secondary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"

                            aria-label="action tabs example"
                      
                        >

                            <Tab
                                label="ALL"
                                onClick={this.clearCategorie}
                                style={{
                                    fontSize:14,
                                }}
                            >

                            </Tab>
                            {this.ProjectTab(categories)}

                        </Tabs>
                    </AppBar>

                </Box>

                <Box
                    ml={2}
                    component="div"
                >

                    <Box
                        component="div"
                        display="inline"
                    >

                    </Box>

                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                    >

                        <Grid item> Note Status:  {this.state.noteListStatus}
                        </Grid>
                        <Grid item>
                            <Switch onChange={this.changDisplayNotesOnStateus} />
                        </Grid>

                        <Grid
                            mr={10}
                        >
                            <AddCategorie
                                categories={this.props.categories}
                                setCategorie={this.props.setCategorie}
                                activeCategorieID={this.state.activeCategorieID}
                                removeCategorie={this.props.removeCategorie}
                            />
                        </Grid>
                    </Grid>
                </Box>


                <div>
                    <div className="box">
                        {filteredExp != "" ?
                            this.displayNotes(filteredExp) :
                            this.displayNotes(
                                this.props.expenses.filter(expense => expense.noteStatus === "open")
                            )}

                    </div>
                    <div className="box">

                        <Box
                            mb={2}
                        >
                            <ButtonGroup
                                color="primary"
                                variant="text"
                                size="large"
                                fullWidth

                            >
                                {this.buttonAddTakeChanges()}


                                <Button
                                    onClick={this.clearShowEditNotes}

                                > CLEAR </Button>

                                <Button
                                    onClick={this.statusChange}
                                >
                                    Set Status:  {this.state.activeNote.noteStatus === "closed" ? "open" : "closed"}
                                </Button>

                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={this.handelRemoveNote}
                                >
                                    remove
                                </Button>

                            </ButtonGroup>
                        </Box>

                        <div>
                            <div>

                                <Autocomplete
                                    id="combo-box-demo"
                                    options={categories}

                                    getOptionLabel={(option) => (option ? option.catName : [])}
                                    inputValue={categorie.toString()}
                                    onInputChange={(event, categorie) => {
                                        this.setState({ categorie })
                                    }}
                                    onChange={this.onCateChange}

                                    renderInput={(params) =>
                                        <TextField {...params}
                                            label={activeCategorieCatName ? activeCategorieCatName : "Project"}
                                            variant="outlined"
                                            autoFocus
                                        />}
                                />
                            </div>
                        </div>

                        <div>
                            <div>
                                <div  >

                                    <TextField
                                        label="Titel"
                                        variant="filled"
                                        value={description}
                                        onChange={this.onDescriptionChange}
                                        margin="dense"
                                        fullWidth
                                        inputProps={{
                                            style: {
                                                fontSize: 16,


                                            }
                                        }}

                                    />
                                </div>
                                <div className="box_relprio">
                                    <TextField
                                        label="Dringlich"
                                        variant="filled"
                                        value={relevance}
                                        onChange={this.onRelevanveChange}
                                        margin="dense"

                                        inputProps={{
                                            style: {
                                                width: 50,
                                                fontSize: 16
                                            }
                                        }}
                                    />
                                    <TextField
                                        label="Wichtig"
                                        variant="filled"
                                        value={important}
                                        onChange={this.onimportantChange}
                                        margin="dense"
                                        inputProps={{
                                            style: {
                                                width: 50,
                                                fontSize: 16,
                                            },
                                        }}
                                    />

                                    <TextField
                                        label="FinishTill"
                                        variant="filled"
                                        value={datesToFinish ? moment(datesToFinish).format("ddd - DD.MM.YY") : ""}
                                        onChange={this.onDateChange}
                                        margin="dense"
                                        inputProps={{
                                            style: { fontSize: 16 }
                                        }}
                                    />

                                </div>

                                <div>
                                    <TextField
                                        label="Note Description"
                                        variant="outlined"
                                        value={noteDecscription}
                                        onChange={this.onNoteDescriptionChange}
                                        margin="normal"

                                        minRows="10"
                                        multiline
                                        fullWidth
                                        inputProps={{
                                            style: {
                                                fontSize: 16,
                                                padding: 2,
                                                height: 200,
                                                lineHeight: 1.2
                                            }
                                        }}
                                    />

                                    <div>
                                        <TextField
                                            label="Next Step"
                                            variant="filled"
                                            value={nextStep}
                                            onChange={this.onNoteNextStepChange}
                                            margin="normal"
                                            fullWidth
                                            inputProps={{
                                                style: {
                                                    fontSize: 16,
                                                }
                                            }}
                                        >

                                        </TextField>
                                    </div>
                                </div>
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
        expenses: getAllExpenses(state).sort((a, b) => (a.prio > b.prio) ? -1 : 1),
        openExpenses: (getAllExpenses(state).sort((a, b) => (a.prio > b.prio) ? -1 : 1)).filter(expense => expense.noteStatus === "open"),

        categories: getAllCategories(state),
    }
}

const mapDispatchToProps = (dispatch) => ({
    removeExpense: (id) => dispatch(removeExpense(id)),
    addExpense: (expense) => dispatch(addExpense(expense)),
    setCategorie: (categorie) => dispatch(setCategorie(categorie)),
    editExpense: (id, updates) => dispatch(editExpense(id, updates)),
    changeStatus: (id, updates) => dispatch(changeStatus(id, updates)),
    removeCategorie: (id) => dispatch(removeCategorie(id)),

})

export default connect(
    mapStateToProps,
    mapDispatchToProps)
    (NotesList)
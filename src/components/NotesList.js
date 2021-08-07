import React from 'react'
import { connect } from 'react-redux'
import { setCategorie } from '../actions/categorie'
import { removeExpense, addExpense, editExpense, changeStatus } from '../actions/notes'
import { getAllCategories } from '../selectors/categories'
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

} from '@material-ui/core'
import { yellow } from '@material-ui/core/colors'
import DropDownCat from './DopDownCatMat'
import { Autocomplete } from '@material-ui/lab';



class NotesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.expenses.id ? this.props.expenses.id : "pups",
            // description: 
            // allExpenses: this.props.expenses ? this.props.expenses.sort((a,b) => (a.sRelevance > b.sRelevance) ? 1: -1) :"",
            activeNote: "",
            allExpenses: this.props.expenses,
            activeCategorie: "",
            filteredExp: "",
            // description: this.activeNote ? this.activeNote.description : this.description, 
            description: "",
            noteDecscription: "",
            relevance: "",
            important: "",
            datesToFinish: "",
            categorie: "",
            doneDate: "",
            noteStatus: this.props.expenses ? "open" : "closed",
            tabCategorie: 0
        }
    }


    clearShowEditNotes = () => {
        this.setState({
            description: "",
            relevance: "",
            important: "",
            noteDecscription: "",
            categorie: "",
            datesToFinish: "",
            activeNote: "",
            categorie: ""
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

        console.log("Active Note: ", this.state.activeNote.description, this.state.activeNote)
    }




    displayLinkedNotes = (expenses) =>
        expenses.map(expense => (
            <li
                className={"selected" ? "selected" : ""}
                key={expense.id}
                onClick={() => this.setActiveNote(expense)}
            >
                {Math.round(expense.prio)}{" - "} {expense.description}
            </li>
        ),
            console.log("expense on DisplLinkNodtes", expenses)
        )
    displayCategories = (categories) =>
        categories.map(categorie => (

            <li
                key={categorie.id}
                onClick={() => this.setActiveCategorie(categorie)}
            >
                {categorie.catName}
            </li>

        )
        )

    setActiveCategorie = (categorie) => {

        this.setState({ activeCategorie: categorie })
        console.log("active Kategoei", this.state.activeCategorie.catName)
        this.DisplyFilterExpensesByCate(this.props.expenses)
    }

    DisplyFilterExpensesByCate = (expenses = this.props.expenses) => {
        const filteExp = expenses.filter(expense => expense.categorie === this.state.activeCategorie.catName)
        this.setState({ filteredExp: filteExp })
        console.log(filteExp);

        this.displayLinkedNotes(filteExp)
        this.setState({ filteredExp: filteExp })

    }

    mapExpensesForDisplay = (expenses) =>
        expenses.map(expense => (
            <li
                key={expense.id}
                onClick={() => this.setActiveNote(expense)}
            >
                # {expense.sRelevance} {"--"} {expense.description}
            </li>
        ),
            console.log("expense on DisplLinkNodtes", expenses)
        )

    clearCategorie = () => {
        console.log("categorie State: ", this.state.categorie);
        this.setState({ filteredExp: "" })
        this.displayLinkedNotes(this.props.expenses)
    }




    onSubmitChanges = () => {
        const description = this.state.description
        const relevance = this.state.relevance
        const important = this.state.important
        const noteDecscription = this.state.noteDecscription

        const updates = { description, relevance, important, noteDecscription }

        this.props.editExpense(this.state.activeNote.id, updates)
        console.log("edit Expense: ", this.state.activeNote.id, updates);

    }

    statusChange = () => {
        const noteStatus = "closed"
        const updates = { noteStatus }

        this.props.editExpense(this.state.activeNote.id, updates)

    }

    changDisplayNotesOnStateus = () => {
        if (this.state.noteStatus === "open") {
            this.setState(() => ({ noteStatus: "closed" }))

        } else {
            this.setState(() => ({ noteStatus: "open" }))
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
        const categorie = e.target.value
        this.setState(() => ({ categorie }))
        console.log(this.state.categorie);
    }

    onTabChange = (e, newValue) => {
        const tabCategorie = newValue
        this.setState(() => ({ tabCategorie }))
        console.log("Tab categorei: ", this.state.tabCategorie);
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
        // const noteDecscription =(timeStamp.concat("\n", notDes, "\n"))
        // const noteDecscription =(timeStamp.concat( "\n", notDes, "\n"))
        const noteDecscription = (space.concat(space, timeStamp, space, notDes, space,))

        const updates = { description, relevance, important, noteDecscription, categorie }

        this.props.editExpense(this.state.activeNote.id, updates)
        console.log("edit Expense: ", this.state.activeNote.id, updates);

        console.log("noteDes", noteDecscription);

        this.clearShowEditNotes()
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

            // datesToFinish: this.state.datesToFinish.valueOf(),
            // categorie: this.props.activeCategorie ? this.props.activeCategorie.id : undefined,
            datesToFinish: this.state.datesToFinish,
            categorie: this.state.categorie
        })
        this.clearShowEditNotes()
    }

    dateFormater = (datesToFinish) => {

        // const date = moment(datesToFinish).format("ddd - DD.MM.YY")
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

            >
            </Tab>

        ))







    render() {
        const { filteredExp, description, relevance, important, noteDecscription, activeNote, datesToFinish, categorie, tabCategorie } = this.state
        const { expenses, categories } = this.props
        const { children, value, index, ...other } = this.props;



        return (

            <div >
                <Box>
                    <AddCategorie
                        categories={this.props.categories}
                        setCategorie={this.props.setCategorie}
                        activeCategorie={this.state.activeCategorie}
                    />
                </Box>
                <Box
                    ml={2}
                >
                    <Button
                        variant="contained"
                        onClick={this.changDisplayNotesOnStateus}
                    >
                        show:  {this.state.noteStatus}
                    </Button>
                </Box>

                <Box
                    ml={2}
                    mt={1}
                    mb={1}

                >




                </Box>

                <Box
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
                            variant="fullWidth"
                            aria-label="action tabs example"
                            // centered
                        >
                
                            <Tab
                                label="ALL"
                                onClick={this.clearCategorie}
                                color="primary"
                            >

                            </Tab>
                            {this.ProjectTab(categories)}
                        </Tabs>
                    </AppBar>

                </Box>


                <div>
                    <div className="box">
                        {filteredExp ? this.displayLinkedNotes(filteredExp) : this.displayLinkedNotes(expenses)}
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
                                    // variant="contained"
                                    // color="primary"
                                    onClick={this.clearShowEditNotes}


                                > Clear</Button>






                                <Button
                                    // variant="contained"
                                    // color="primary"
                                    onClick={this.statusChange}
                                >
                                    change Status
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
                                            label="Project"
                                            variant="outlined"
                                            autoFocus


                                        />}

                                />
                            </div>
                        </div>




                        <div>
                            <div
                            >
                                <div
                                >

                                    <TextField
                                        label="Titel"
                                        variant="filled"
                                        value={description}
                                        onChange={this.onDescriptionChange}
                                        margin="dense"
                                        width="300"
                                        inputProps={{
                                            style: { fontSize: 16 }
                                        }}

                                    />
                                </div>
                                <div className="box_relprio">
                                    <TextField
                                        label="Relevance"
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

                                <div >


                                </div>

                                <div>
                                    <TextField
                                        label="Note Description"
                                        variant="outlined"
                                        value={noteDecscription}
                                        onChange={this.onNoteDescriptionChange}
                                        margin="normal"

                                        minRows="10"

                                        // rowsMax
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
                                </div>
                            </div>





                        </div>
                    </div>

                </div>

                <div>
                    <div>


                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        expenses: getAllExpenses(state).sort((a, b) => (a.prio > b.prio) ? -1 : 1),
        categories: getAllCategories(state),
    }
}

const mapDispatchToProps = (dispatch) => ({
    removeExpense: (id) => dispatch(removeExpense(id)),
    addExpense: (expense) => dispatch(addExpense(expense)),
    setCategorie: (categorie) => dispatch(setCategorie(categorie)),
    editExpense: (id, updates) => dispatch(editExpense(id, updates)),
    changeStatus: (id, updates) => dispatch(changeStatus(id, updates)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps)
    (NotesList)
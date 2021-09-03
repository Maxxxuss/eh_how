import React from 'react'
import { connect } from 'react-redux'
import { setCategorie, removeCategorie } from '../actions/categorie'
import { removeExpense, addExpense, editExpense, changeStatus } from '../actions/notes'
import { getAllCategories, getHistorieCategorie } from '../selectors/categories'
import { getAllExpenses } from '../selectors/notes'
import moment from "moment-timezone"
import {
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
    Link,
    Snackbar,
    FormControl,
    MenuItem,
    Select,
    InputLabel,

} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import SetRisk from './riskButton'
import AddDeleteProject from './AddDeleteProject'
import DoubleCheckRemoveButton from './Button/DoubleCheckRemoveButton'
import { Alert } from './Notification/NotificationBar'


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
            infoNote: false,
            searchNotesInputValue: "",
            journalNote: false,
            noteUpdateDate: moment()._d,
            notificationStatus: false,
            snackbarServety: "",
            snackBarMessage: "",
            snooze: false,
            onHold: false,
            effort: "",
        }
    }


    clearShoweditRisks = () => {
        this.setState({
            description: "",
            relevance: "",
            important: "",
            noteDecscription: "",
            datesToFinish: "",
            activeNote: "",
            categorie: "",
            nextStep: "",
            infoNote: false,
            journalNote: false,
            snooze: false,
            onHold: false,
            effort: "",

        })
    }


    handelRemoveNote = () => {
        this.props.removeExpense({ id: this.state.activeNote.id })
        this.clearShoweditRisks()
        this.updateFilteExp(this.state.noteListStatus)
        this.setState({
            notificationStatus: true,
            snackbarServety: "info",
            snackBarMessage: "Note erfolgreich gelöscht"

        })

    }

    handelSnackAlert = (notMess) => {
        <MuiAlert elevation={6} variant="filled" {...notMess} />

    }
    handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ notificationStatus: false })
    };



    setActiveNote = (expense) => {
        this.setState({ activeNote: expense })
        this.setState({ description: expense.description })
        this.setState({ noteDecscription: expense.noteDecscription })
        this.setState({ relevance: expense.relevance })
        this.setState({ important: expense.important })
        this.setState({ datesToFinish: expense.datesToFinish })
        this.setState({ categorie: expense.categorie })
        this.setState({ activeNoteStatus: expense.noteStatus })
        this.setState({ nextStep: expense.nextStep })
        this.setState({ infoNote: expense.infoNote })
        this.setState({ journalNote: expense.journalNote })
        this.setState({ snooze: expense.snooze })
        this.setState({ onHold: expense.onHold })
        this.setState({ effort: expense.effort })



        console.log("setActive Note : active Note State:", this.state.activeNoteStatus);
        console.log("Date Time", this.state.noteUpdateDate);
    }

    showHintForTimedNotes = (expense) => {
        const days = expense.absDatesToFinish

        const daySubStrin = parseInt(days)

        if (days > -0.4 && days < 0.6) {
            return (

                <p
                    style={{
                        color: "Green",
                        backgroundColor: "ghostWhite"
                    }}
                >
                    Do-Today
                </p>
            )


        }
        if (days < -0.4) {
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


    displayNotes = (expenses, active) =>
        expenses.map(expense => (

            <li
                className={this.state.activeNote.id === expense.id ? "selected_noteListStylInt" : "noteListStylInt"}
                key={expense.id}
                onClick={() => this.setActiveNote(expense)}
                style={{
                    marginBottom: "8px",
                }}
            >
                <div
                    className="noteListStylInt"
                >
                    {Math.round(expense.prio)} {expense.categorie} - {expense.description} -
                    {expense.infoNote === true ? <span
                        style={{
                            color: 'red',
                            backgroundColor: 'yellow',

                        }}     >info</span> : ""} -

                    {expense.riskAuswirkung != "" || expense.riskWahrscheinlichkeit != "" ? <span
                        style={{
                            color: 'yellow',
                            backgroundColor: 'red',

                        }}     >Risk</span> : ""} -

                    {this.showHintForTimedNotes(expense)}

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

        var nStatus = noteStatus 

        console.log("nStatus", nStatus);
        console.log("noteStatus", noteStatus);
        console.log("STATE NoteStatus", this.state.noteListStatus);




        if (activeCategorieCatName != "" && nStatus === "allOpen") {
            this.setState({ noteListStatus: nStatus }, () => {
                const filteExp = this.props.expenses.filter(expense => expense.categorie === activeCategorieCatName && expense.absDatesToFinish < "0.6")
                const catFilteExp = filteExp.filter(catExp => catExp.noteStatus === "open")
                this.setState({ filteredExp: catFilteExp })

                console.log("F 3 ; Upodate Filte Exp: ", catFilteExp);
            })

        }

         if (activeCategorieCatName === "" && nStatus === "allOpen") {
            this.setState({ noteListStatus: nStatus }, () => {
                const catFilteExp = this.props.expenses.filter(catExp => catExp.noteStatus === "open" && catExp.absDatesToFinish < "0.6")
                this.setState({ filteredExp: catFilteExp })

                console.log("F 4 ; Upodate Filte Exp: ", catFilteExp);
            })

        }

        if (activeCategorieCatName != "" && nStatus != "allOpen") {
            this.setState({ noteListStatus: nStatus }, () => {
                const filteExp = this.props.expenses.filter(expense => expense.categorie === activeCategorieCatName)
                const catFilteExp = filteExp.filter(catExp => catExp.noteStatus === nStatus)
                this.setState({ filteredExp: catFilteExp })

                console.log("F 1 : Upodate Filte Exp: ", catFilteExp);
            })

        }

         if (activeCategorieCatName === "" && nStatus != "allOpen") {
            this.setState({ noteStatus: nStatus }, () => {
                const catFilteExp = this.props.expenses.filter(catExp => catExp.noteStatus === nStatus)
                this.setState({ filteredExp: catFilteExp })

                console.log("F 2 ; Upodate Filte Exp: ", catFilteExp);
            })

        }

  


    }

    statusChange = (e) => {
        const { activeCategorieCatName, noteUpdateDate } = this.state

        console.log("Status Change activeCategorieCatName:", activeCategorieCatName);


        if (this.state.activeNote.noteStatus === "open") {
            const noteStatus = "closed"
            const updates = { noteStatus, noteUpdateDate }

            this.onSubmitChanges(e)

            this.props.editExpense(this.state.activeNote.id, updates)

            this.updateFilteExp(this.state.noteListStatus)
            this.setState({
                notificationStatus: true,
                snackbarServety: "info",
                snackBarMessage: "Status Change erfolgreich"
            })

            console.log("Status Change NoteStatus:", this.state.noteStatus);

            this.clearShoweditRisks()


        } else {
            const noteStatus = "open"
            const updates = { noteStatus, noteUpdateDate }

            this.props.editExpense(this.state.activeNote.id, updates)

            this.updateFilteExp(this.state.noteListStatus)
            console.log("Else Note Status : ", this.state.noteStatus);

        }
    }

    SnackBarForAddDeleteButton = () => {
        this.setState({
            notificationStatus: true,
            snackbarServety: "success",
            snackBarMessage: "Set new Project erfolgreich"

        })
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
    }

    onCateChange = (e) => {
        const activeCategorieCatName = e.target.value
        this.setState(() => ({ activeCategorieCatName }))
    }

    onTabChange = (e, newValue) => {
        const categories = this.props.categories
        const tabCategorie = newValue
        this.setState(() => ({ tabCategorie, noteListStatus: "open" }))
        console.log("Tab categorei: ", this.state.tabCategorie);
        this.clearShoweditRisks()

    }

    onNoteNextStepChange = (e) => {
        const nextStep = e.target.value
        this.setState(() => ({ nextStep }))
    }

    onInfoNoteChange = () => {

        const { noteUpdateDate } = this.state

        const infoNote = this.state.infoNote === true ? false : true
        this.setState(() => ({ infoNote }))

        const updates = { infoNote, noteUpdateDate }
        this.props.editExpense(this.state.activeNote.id, updates)

        this.updateFilteExp(this.state.noteListStatus)
    }

    onNoteFilterChange = (e) => {
        const noteListFilter = e.target.value
        this.setState({noteListStatus : noteListFilter})


        this.updateFilteExp(noteListFilter)

    }


    onSnoozeChange = () => {

        const snooze = this.state.snooze === true ? false : true
        this.setState(() => ({ snooze }))

        const updates = { snooze }
        this.props.editExpense(this.state.activeNote.id, updates)

        this.updateFilteExp(this.state.noteListStatus)

        console.log("SNOOZE Status:", snooze);
    }

    onHold = () => {

        const onHold = this.state.onHold === true ? false : true
        this.setState(() => ({ onHold }))

        const updates = { onHold }
        this.props.editExpense(this.state.activeNote.id, updates)

        this.updateFilteExp(this.state.noteListStatus)
    }



    onSearchNotesInputValueChange = (e) => {
        const searchNotesInputValue = e.target.value
        this.setState(() => ({ searchNotesInputValue }))
        console.log(this.state.searchNotesInputValue);
    }

    onJournalNoteChange = () => {

        const { noteUpdateDate } = this.state

        const journalNote = this.state.journalNote === true ? false : true
        this.setState(() => ({ journalNote }))

        const updates = { journalNote, noteUpdateDate }
        this.props.editExpense(this.state.activeNote.id, updates)

    }

    onEffortChange = (e) => {
        const effort = e.target.value
        this.setState(() => ({ effort }))
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
        const infoNote = this.state.infoNote
        const noteUpdateDate = this.state.noteUpdateDate
        const effort = this.state.effort


        const updates = { description, relevance, important, noteDecscription, categorie, datesToFinish, nextStep, infoNote, noteUpdateDate, effort }

        this.props.editExpense(this.state.activeNote.id, updates)


        const activeNoteStatus = this.state.activeNote.noteStatus


        this.updateFilteExp(this.state.noteListStatus)
        console.log("edit Expense: ", this.state.activeNote.id, updates);

        this.setState({
            notificationStatus: true,
            snackbarServety: "success",
            snackBarMessage: "Note Change erfolgreich"

        })

    }

    editRisk = (noteId, update) => {

        this.props.editExpense(noteId, update)
        this.updateFilteExp(this.state.noteListStatus)
        this.setState({
            notificationStatus: true,
            snackbarServety: "success",
            snackBarMessage: "Risk erfolgreich hinzugefügt"

        })


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
            nextStep: this.state.nextStep,
            infoNote: this.state.infoNote,
            effort: this.state.effort,

        })
        this.updateFilteExp(this.state.noteListStatus)
        this.clearShoweditRisks()
        this.setState({
            notificationStatus: true,
            snackbarServety: "success",
            snackBarMessage: "Note erfolgreich hinzugefügt"
        })


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
                    fontSize: 16,
                }}
            >
            </Tab>

        ))

    showRiskDetails = () => {
        const riskAus = this.state.activeNote.riskAuswirkung
        const riskWar = this.state.activeNote.riskWahrscheinlichkeit


        const riskFormater = (x) => {
            if (x === 120) {
                return "Hoch"

            } if (x === 113) {
                return "Mittel"

            }
            if (x === 105) {
                return "niedrig"
            }
            else {
                return ""

            }
        }

        if (riskAus !== "" || riskWar !== "") {
            return (
                <Box
                >
                    <TextField
                        label="Risiko Auswirkung"
                        value={riskFormater(riskAus)}
                        inputProps={{
                            readOnly: true,

                            style: {
                                textAlign: "center"
                            }
                        }}
                    >
                    </TextField>

                    <TextField
                        label="Risiko Wahrs."
                        value={riskFormater(riskWar)}
                        inputProps={{
                            readOnly: true,
                            style: {
                                textAlign: "center"
                            }


                        }}
                    >
                    </TextField>
                </Box>
            )

        } else {
            return <div>

            </div>

        }
    }



    render() {
        const { filteredExp, description, relevance, important, noteDecscription, activeNote, datesToFinish, categorie, tabCategorie, activeCategorieCatName, noteStatus, nextStep, infoNote, journalNote,
            snooze, onHold, effort, noteListStatus
        } = this.state
        const { expenses, categories } = this.props
        const { children, value, index, ...other } = this.props;


        return (

            <div>


                <div

                    style={{
                        marginTop: 10,
                        marginLeft: 15
                    }}>

                    <Grid


                        container
                        spacing={2}
                        mt={20}

                        direction="row"
                        justifyContent="flex-start"

                        alignItems="center"
                    >

                        <Grid
                            item
                        >
                            <Link
                                href="/proDash"
                                style={{
                                    marginBottom: "20",
                                    backgroundColor: "yellow",

                                }}
                            >
                                Project Dashboard
                            </Link>

                        </Grid>

                        <Grid
                            item
                        >

                            <AddDeleteProject
                                setCategorie={this.props.setCategorie}
                                removeCategorie={this.props.removeCategorie}
                                onInputChange={(event, activeNote) => {
                                    this.setState({ activeNote })
                                }}
                                SnackBar={this.SnackBarForAddDeleteButton}

                            />

                        </Grid>


                    </Grid>

                </div>


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
                                    fontSize: 14,
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


                </Box>

                <div>
                    <div className="box">

                        <div >

                            <Grid
                                container
                                direction="row"
                                justifyContent="space-evenly"

                            >

                                <Grid
                                    item
                                    xs={10}
                                >
                                    <Autocomplete
                                        onChange={(event, expense) => {
                                            expense != null ? this.setActiveNote(expense) : this.clearShoweditRisks()
                                        }}

                                        options={filteredExp ? filteredExp : this.props.expenses}
                                        getOptionLabel={(filteredExp) => filteredExp.description ? filteredExp.description + "  -  " + filteredExp.noteDecscription.substr(17, 235) : ""}
                                        style={{
                                            marginBottom: "10px",
                                            background: "rgba(238, 238, 238, 0.405)"
                                        }}
                                        fullWidth
                                        renderInput={(params) => <TextField {...params} label="Search Note" variant="outlined" />}
                                    />

                                </Grid>

                                <Grid item>


                                    <FormControl>
                                        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                                        <Select
                                            // labelId="demo-simple-select-label"
                                            // id="demo-simple-select"
                                            value={noteListStatus}
                                            label="Filter"
                                            onChange={this.onNoteFilterChange}
                                        >
                                            <MenuItem value={"open"}>Open</MenuItem>
                                            <MenuItem value={"allOpen"}>Just Do´s</MenuItem>
                                            <MenuItem value={"closed"}>closed</MenuItem>
                                        </Select>
                                    </FormControl>

                                </Grid>

                            </Grid>

                        </div>



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
                                size="small"
                                fullWidth

                            >
                                {this.buttonAddTakeChanges()}


                                <Button
                                    onClick={this.clearShoweditRisks}

                                > CLEAR
                                </Button>

                                <Button

                                    onClick={this.statusChange}
                                >
                                    Set Status:  {this.state.activeNote.noteStatus === "closed" ? "open" : "closed"}


                                </Button>


                                <DoubleCheckRemoveButton
                                    activeNote={this.state.activeNote}
                                    handelRemoveNote={this.handelRemoveNote}


                                />

                            </ButtonGroup>
                        </Box>


                        <Grid
                            container
                            spacing={2}
                            direction="row"
                            justifyContent="space-between"

                        >
                            <Grid
                                item xs={4}
                            >

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
                                            color="secondary"
                                        />}
                                />
                            </Grid>
                            <Grid >

                                <Grid
                                    container
                                    direction="column"


                                >
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={infoNote}
                                                onChange={this.onInfoNoteChange}
                                                name="Info Note"
                                            // color=

                                            />
                                        }
                                        label="Info-Note"
                                    />

                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={journalNote}
                                                onChange={this.onJournalNoteChange}
                                            // name="Set Journal"
                                            />
                                        }
                                        label="Set to Journal"
                                    />
                                </Grid>


                            </Grid>

                            <Grid>

                                <Grid
                                    container
                                    direction="column"
                                >
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={snooze}
                                                onChange={this.onSnoozeChange}
                                                name="Snooze Note"

                                            />
                                        }
                                        label="Snooze"
                                    />
      

                                </Grid>
                            </Grid>

                            <Grid>
                                <SetRisk
                                    editRisk={this.editRisk}
                                    activeNote={this.state.activeNote}
                                />
                                <this.showRiskDetails />

                            </Grid>

                        </Grid>

                        <div>
                            <div>
                                <div
                                    style={{
                                        marginBottom: 10,
                                        marginTop: 15

                                    }}
                                >
                                    <TextField
                                        label="Titel"
                                        variant="filled"
                                        value={description}
                                        onChange={this.onDescriptionChange}
                                        color="secondary"
                                        fullWidth

                                        inputProps={{
                                            style: {
                                                fontSize: 18,

                                            }
                                        }}

                                    />
                                </div>
                                <div className="box_relprio">

                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-evenly"


                                    >
                                        <Grid item
                                            xs={2}
                                        >

                                            <TextField
                                                label="Dringlich"
                                                variant="filled"
                                                value={relevance}
                                                onChange={this.onRelevanveChange}
                                                color="secondary"

                                                inputProps={{
                                                    style: {
                                                        fontSize: 18,
                                                    }
                                                }}
                                            />

                                        </Grid>

                                        <Grid item
                                            xs={2}

                                        >

                                            <TextField
                                                label="Wichtig"
                                                variant="filled"
                                                value={important}
                                                onChange={this.onimportantChange}
                                                color="secondary"
                                                inputProps={{
                                                    style: {
                                                        fontSize: 18,
                                                    }
                                                }}
                                            />

                                        </Grid>

                                        <Grid item
                                            xs={3}
                                        >
                                            <TextField
                                                label="FinishTill"
                                                variant="filled"
                                                value={datesToFinish ? moment(datesToFinish).format("ddd - DD.MM.YY") : ""}
                                                onChange={this.onDateChange}
                                                color="secondary"
                                                inputProps={{
                                                    style: {
                                                        fontSize: 18,
                                                    }
                                                }}
                                            />

                                        </Grid>

                                        <Grid item
                                            xs={2}

                                        >

                                            <TextField
                                                label="Aufwand"
                                                variant="filled"
                                                value={effort}
                                                onChange={this.onEffortChange}
                                                color="secondary"
                                                inputProps={{
                                                    style: {
                                                        fontSize: 18,
                                                    }
                                                }}
                                            />

                                        </Grid>


                                    </Grid>

                                </div>
                                <div>
                                    <TextField
                                        label="Note Description"
                                        variant="outlined"
                                        value={noteDecscription}
                                        onChange={this.onNoteDescriptionChange}
                                        margin="normal"
                                        color="secondary"


                                        minRows="10"
                                        multiline
                                        fullWidth
                                        inputProps={{
                                            style: {
                                                fontSize: 16,
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
                                            color="secondary"
                                        >

                                        </TextField>
                                        <div>

                                            <Snackbar open={this.state.notificationStatus} autoHideDuration={2000} onClose={this.handleCloseSnackbar}>
                                                <Alert onClose={this.handleCloseSnackbar} severity={this.state.snackbarServety}>
                                                    {this.state.snackBarMessage}
                                                </Alert>
                                            </Snackbar>

                                        </div>
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
        historyCategorie: getHistorieCategorie(state)
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
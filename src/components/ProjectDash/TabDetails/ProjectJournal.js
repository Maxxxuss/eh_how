import { Grid, TextField } from "@material-ui/core"
import React from "react"

export default function ProjectJournal(props) {

    const [showJournalNote, setShowJournalNote] = React.useState("")

    const filteJournalNote = () => {
        var journalExpenses = props.journalExpenses
        var catFilter = props.activeCategorie

        var filteredNotes = journalExpenses.filter(expense => expense.categorie === catFilter.catName)
        console.log("Filter Notes By Cat Journal", filteredNotes);
        return (
            filteredNotes
        )

    }

    const setActiveNote = (expense) => {
        setShowJournalNote(expense.noteDecscription)

    }


    const displayNotes = () =>
        filteJournalNote().map(expense => (

            <li
                className="noteListStylInt"
                key={expense.id}
                onClick={() => setActiveNote(expense)}
                style={{
                    marginBottom: "8px",
                    listStyleType: "none", 
                    fontSize:"16px"
                    
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
                            
                            // width:300,
                            // textAlign: "right"
                        }}     >info</span> : ""} -

                    {expense.riskAuswirkung != "" || expense.riskWahrscheinlichkeit != "" ? <span
                        style={{
                            color: 'yellow',
                            backgroundColor: 'red',
                            // width:300,
                            // textAlign: "right"
                        }}     >Risk</span> : ""} -

                    {/* {this.showHintForTimedNotes(expense)} */}

                    <p>
                        {expense.noteDecscription.substr(16, 80)}

                    </p>

                </div>

            </li>

        ),
        )

    const displayNoteDetails = () => {


        return (


            <TextField
                disabled
                variant="outlined"
                multiline
                label="Project Journal"

                value={showJournalNote}
                inputProps={{
                    style: {
                        width: 550
                    }
                }}

            >

            </TextField>

        )

    }

    return (
        <div>
            <h3>Project Journal </h3>
            {console.log("Journal Expenes ProjektJournal", props.journalExpenses)
            }

            <Grid
                container
                justifyContent="center"

                alignContent="center"

            >


                <Grid item>
                    {displayNotes()}

                </Grid>

                <Grid item>
                    {filteJournalNote() != "" ? displayNoteDetails() :""  }

                </Grid>

            </Grid>

        </div>
    )



}
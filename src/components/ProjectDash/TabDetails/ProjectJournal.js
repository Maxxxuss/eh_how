import React from "react"

export default function ProjectJournal(props) {

    const [showJournalNote, setShowJournalNote] = React.useState("")

    const filteJournalNote = () => {
        var journalExpenses = props.journalExpenses
        var catFilter = props.activeCategorie

        var filteredNotes = journalExpenses.filter(expense => expense.categorie === catFilter.catName)
        console.log("Filter Notes By Cat Journal", filteredNotes);
        return(
            filteredNotes
        )

    }


    const displayNotes = () =>
        filteJournalNote().map(expense => (

            <li
                className="noteListStylInt"
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

    return (
        <div>
            <h3>Project Journal </h3>
            {console.log("Journal Expenes ProjektJournal", props.journalExpenses)
            }
                {displayNotes()}

        </div>
    )



}
import { TextField } from '@material-ui/core';
import React from 'react';
import PDetailsAddSetRemoveButton from './ProjDetailsButtonAddSetRemove';



export default function TabDetailsProDetails(props) {

    const [catID, setCatID] = React.useState("")
    const [catName, setCatName] = React.useState("")
    const [m1, setM1] = React.useState("")
    const [m2, setM2] = React.useState("")
    const [m3, setM3] = React.useState("")
    const [m4, setM4] = React.useState("")
    const [activeCategorie, setActiveCategorie] = React.useState("")

    const [journal, setJournal] = React.useState("")

    const onCatIDChange = (e) => {
        const catID = e.target.value
        setCatID(catID)

    }
    const onCatNameChange = (e) => {
        const catName = e.target.value
        setCatName(catName)
    }
    const onM1Cahnge = (e) => {
        const m1 = e.target.value
        setM1(m1)
    }
    const onM2Cahnge = (e) => {
        const m2 = e.target.value
        setM2(m2)
    }
    const onM3Cahnge = (e) => {
        const m3 = e.target.value
        setM3(m3)
    }
    const onM4Cahnge = (e) => {
        const m4 = e.target.value
        setM4(m4)
    }
    const onJournalChange = (e) => {
        const journal = e.target.value
        setJournal(journal)
    }



    if (activeCategorie != props.activeCategorie) {
        setActiveCategorie(props.activeCategorie),

            setCatID(props.activeCategorie.catID)
        setCatName(props.activeCategorie.catName)
        setM1(props.activeCategorie.m1)
        setM2(props.activeCategorie.m2)
        setM3(props.activeCategorie.m3)
        setM4(props.activeCategorie.m4)
        setJournal(props.activeCategorie.journal)
    }




    return (

        <div>
            <div>
                <PDetailsAddSetRemoveButton
                    setCategorie={props.setCategorie}
                    editCategorie={props.editCategorie}
                    removeCategorie={props.removeCategorie}
                   
                    activeCategorie = {activeCategorie}
                   
                    catID={catID}
                    catName={catName}
                    m1={m1}
                    m2={m2}
                    m3={m3}
                    m4={m4}
                    journal={journal}



                />

            </div>



            <TextField

                label="Project ID"
                value={catID}
                onChange={onCatIDChange}
            >
            </TextField>

            <TextField

                label="Projekt Name"
                value={catName}
                onChange={onCatNameChange}
            >
            </TextField>

            <TextField

                label="M1 - P.-Start"
                value={m1}
                onChange={onM1Cahnge}
            >
            </TextField>

            <TextField
                label="M2 - Start Rea."
                value={m2}
                onChange={onM2Cahnge}
            >
            </TextField>
            <TextField
                label="M3 - Ende Rea."
                value={m3}
                onChange={onM3Cahnge}
            >
            </TextField>
            <TextField
                label="M4 - P.- Ende"
                value={m4}
                onChange={onM4Cahnge}
            >
            </TextField>

            <div>
                <TextField
                    variant="outlined"
                    label="Project Journal"
                    value={journal}
                    onChange={onJournalChange}
                    margin="dense"
                    minRows="10"

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

    )
}
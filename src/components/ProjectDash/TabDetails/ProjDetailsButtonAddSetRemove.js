import { Button, ButtonGroup } from '@material-ui/core';
import React from 'react';



export default function PDetailsAddSetRemoveButton(props) {

    const addCategorie = () => {
        props.setCategorie({
            catName: props.catName,
            details: props.details,
            catID: props.catID,
            m1: props.m1,
            m2: props.m2,
            m3: props.m3,
            m4: props.m4,

            journal: props.journal,


        })
        console.log("categorie added");


    }

    const clearProjDetails = () => {
        this.setState({
            catName: "",
            details: "",
            catID: "",
            m1: "",
            m2: "",
            m3: "",
            m4: "",
            journal: "",
        })

    }

    const removeProject = () => {
        const activeCategorie = props.activeCategorie.id

        props.removeCategorie({
            id: activeCategorie
        })

    }

    const changeCategorieDetails = () => {


        const catName = props.catName
        const details = props.details
        const catID = props.catID
        const m1 = props.m1
        const m2 = props.m2
        const m3 = props.m3
        const m4 = props.m4

        const journal = props.journal

        const updates = { catName, details, catID, m1, m2, m3, m4, journal }


        props.editCategorie(props.activeCategorie.id, updates)
    }
    return (

        <ButtonGroup
            variant="contained"
            size="small"
        >
            <Button
                color="primary"
                onClick={addCategorie}
            >
                Add
            </Button>
            <Button
                onClick={changeCategorieDetails}
            >
                Take Changes
            </Button>
            <Button
                onClick={clearProjDetails}
            >
                clear
            </Button>
            <Button
                color="secondary"
                onClick={removeProject}

            >
                Remove
            </Button>
        </ButtonGroup>

    )

}
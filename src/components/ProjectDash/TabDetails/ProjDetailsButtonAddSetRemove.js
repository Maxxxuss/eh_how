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

            // H I S T O R Y  D A T A

            m1_1: props.m1_1,
            m2_1: props.m2_1,
            m3_1: props.m3_1,
            m4_1: props.m4_1,
            
            m1_2: props.m1_2,
            m2_2: props.m2_2,
            m3_2: props.m3_2,
            m4_2: props.m4_2,

            journal: props.journal,


        })
        console.log("categorie added");


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

        const m1_1= props.m1_1
        const m2_1= props.m2_1
        const m3_1= props.m3_1
        const m4_1= props.m4_1
        
        const m1_2= props.m1_2
        const m2_2= props.m2_2
        const m3_2= props.m3_2
        const m4_2= props.m4_2

        


        const journal = props.journal

        const updates = { catName, details, catID, m1, m2, m3, m4, m1_1, m2_1, m3_1, m4_1, m1_2, m2_2, m3_2, m4_2, journal }


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
                onClick={props.clearProjDetails}
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
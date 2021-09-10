import { Grid, TextField, Switch, Paper, Collapse, FormControlLabel , makeStyles} from '@material-ui/core';
import React from 'react';
import PDetailsAddSetRemoveButton from './ProjDetailsButtonAddSetRemove';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 180,
    },
    container: {
        display: 'flex',
    },
    paper: {
        margin: theme.spacing(1),
    },
    svg: {
        width: 100,
        height: 100,
    },
    polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1,
    },
}));





export default function TabDetailsProDetails(props) {

    const classes = useStyles();


    const [sorting, setSorting] = React.useState("")
    const [catID, setCatID] = React.useState("")
    const [catName, setCatName] = React.useState("")
    const [m1, setM1] = React.useState("")
    const [m2, setM2] = React.useState("")
    const [m3, setM3] = React.useState("")
    const [m4, setM4] = React.useState("")

    //Histroy Data
    const [checked, setChecked] = React.useState(false);

    const [m1_1, setM1_1] = React.useState("")
    const [m2_1, setM2_1] = React.useState("")
    const [m3_1, setM3_1] = React.useState("")
    const [m4_1, setM4_1] = React.useState("")

    const [m1_2, setM1_2] = React.useState("")
    const [m2_2, setM2_2] = React.useState("")
    const [m3_2, setM3_2] = React.useState("")
    const [m4_2, setM4_2] = React.useState("")

    const [activeCategorie, setActiveCategorie] = React.useState("")

    const [journal, setJournal] = React.useState("")


    const onChangeSorting = (e) => {
        const sorting = e.target.value
        setSorting(sorting)
    }

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

    // H I S T O R Y    D A T A
    const onM1_1Cahnge = (e) => {
        const m1_1 = e.target.value
        setM1_1(m1_1)
    }
    const onM2_1Cahnge = (e) => {
        const m2_1 = e.target.value
        setM2_1(m2_1)
    }
    const onM3_1Cahnge = (e) => {
        const m3_1 = e.target.value
        setM3_1(m3_1)
    }
    const onM4_1Cahnge = (e) => {
        const m4_1 = e.target.value
        setM4_1(m4_1)
    }

    const onM1_2Cahnge = (e) => {
        const m1_2 = e.target.value
        setM1_2(m1_2)
    }
    const onM2_2Cahnge = (e) => {
        const m2_2 = e.target.value
        setM2_2(m2_2)
    }
    const onM3_2Cahnge = (e) => {
        const m3_2 = e.target.value
        setM3_2(m3_2)
    }
    const onM4_2Cahnge = (e) => {
        const m4_2 = e.target.value
        setM4_2(m4_2)
    }

    const handleChange = () => {
        setChecked((prev) => !prev);
    };



    const clearProjDetails = () => {
        setSorting("")
        setCatID("")
        setCatName("")
        setM1("")
        setM2("")
        setM3("")
        setM4("")

        //Histroy Data
        setM1_1("")
        setM2_1("")
        setM3_1("")
        setM4_1("")

        setM1_2("")
        setM2_2("")
        setM3_2("")
        setM4_2("")
    }


    if (activeCategorie != props.activeCategorie) {
        setActiveCategorie(props.activeCategorie)

        setSorting(props.activeCategorie.sorting)
     setCatID(props.activeCategorie.catID)
        setCatName(props.activeCategorie.catName)
        setM1(props.activeCategorie.m1)
        setM2(props.activeCategorie.m2)
        setM3(props.activeCategorie.m3)
        setM4(props.activeCategorie.m4)

        setJournal(props.activeCategorie.journal)

        setM1_1(props.actHistroyCategorie.m1_1)
        setM2_1(props.actHistroyCategorie.m2_1)
        setM3_1(props.actHistroyCategorie.m3_1)
        setM4_1(props.actHistroyCategorie.m4_1)

        setM1_2(props.actHistroyCategorie.m1_2)
        setM2_2(props.actHistroyCategorie.m2_2)
        setM3_2(props.actHistroyCategorie.m3_2)
        setM4_2(props.actHistroyCategorie.m4_2)


    }


    return (

        <div className={classes.root}>
            <div>
                <PDetailsAddSetRemoveButton
                    setCategorie={props.setCategorie}
                    editCategorie={props.editCategorie}
                    removeCategorie={props.removeCategorie}
                    clearProjDetails={clearProjDetails}

                    activeCategorie={activeCategorie}

                    sorting={sorting}

                    catID={catID}
                    catName={catName}
                    m1={m1}
                    m2={m2}
                    m3={m3}
                    m4={m4}

                    m1_1={m1_1}
                    m2_1={m2_1}
                    m3_1={m3_1}
                    m4_1={m4_1}

                    m1_2={m1_2}
                    m2_2={m2_2}
                    m3_2={m3_2}
                    m4_2={m4_2}

                    journal={journal}
                />
            </div>

            <TextField
                    label="Sort"
                    value={sorting}
                onChange={onChangeSorting}
                >
                </TextField>

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

                <FormControlLabel
                    control={<Switch checked={checked} onChange={handleChange} />}
                    label="Show MileStone History"
                />
                <div className={classes.container}>

                    <Collapse in={checked} collapsedSize={40}>
                        <Paper elevation={4} className={classes.paper}>

                            <div>
                                <TextField

                                    label="M1 - vorheriger"
                                    value={m1_1}
                                    onChange={onM1_1Cahnge}
                                >
                                </TextField>

                                <TextField
                                    label="M2 - vorheriger"
                                    value={m2_1}
                                    onChange={onM2_1Cahnge}
                                >
                                </TextField>
                                <TextField
                                    label="M3 - vorheriger"
                                    value={m3_1}
                                    onChange={onM3_1Cahnge}
                                >
                                </TextField>
                                <TextField
                                    label="M4 - vorheriger"
                                    value={m4_1}
                                    onChange={onM4_1Cahnge}
                                >
                                </TextField>
                            </div>


                            <div>
                                <TextField

                                    label="M1 - P.-Plan"
                                    value={m1_2}
                                    onChange={onM1_2Cahnge}
                                >
                                </TextField>

                                <TextField
                                    label="M2 - P.-Plan"
                                    value={m2_2}
                                    onChange={onM2_2Cahnge}
                                >
                                </TextField>
                                <TextField
                                    label="M3 - P.-Plan"
                                    value={m3_2}
                                    onChange={onM3_2Cahnge}
                                >
                                </TextField>
                                <TextField
                                    label="M4 - P.-Plan"
                                    value={m4_2}
                                    onChange={onM4_2Cahnge}
                                >
                                </TextField>
                            </div>
                        </Paper>
                    </Collapse>
                </div>


            </div>






        </div>

    )
}
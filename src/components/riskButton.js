import React from 'react';
import { createTheme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },

}));
const theme = createTheme({
    palette: {
        primary: green,
    },
});


export default function SetRisk(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [auswirkung, setAuswirkung] = React.useState('');
    const [occurence, setOccurence] = React.useState("")

    const propRiskAus = props.activeNote.riskAuswirkung ? props.activeNote.riskAuswirkung : ""
    const propsRiskWahr = props.activeNote.riskWahrscheinlichkeit ? props.activeNote.riskWahrscheinlichkeit : ""

    const handelAuswirkungChange = (event) => {
        setAuswirkung(Number(event.target.value) || '');
    };

    const handelOccurenceChange = (event) => {
        setOccurence(Number(event.target.value) || '');
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setAuswirkung("")
        setOccurence("")
        setOpen(false);
    };

    const handelAddRisk = () => {
        props.editNote(
            props.activeNote.id, {
            riskAuswirkung: auswirkung,
            riskWahrscheinlichkeit: occurence
        }

        )


        handleClose()

    }

    const showRisikButton = () => {
        if (propRiskAus != "" || propsRiskWahr != "") {
            return "Edit Risk"

        } else {
            return "Set Risk"
        }

    }


    return (
        <div>
            <Button
                onClick={handleClickOpen}
                color="secondary"
                variant="outlined"
                theme={theme}


            >{showRisikButton()}</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Fill the form</DialogTitle>
                <DialogContent>
                    <form className={classes.container}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="demo-dialog-native">Auswirkung</InputLabel>
                            <Select
                                native
                                value={auswirkung}
                                onChange={handelAuswirkungChange}
                                input={<Input id="demo-dialog-native" />}
                            >
                                <option aria-label="None" value="" />
                                <option value={120}>Hoch</option>
                                <option value={113}>Mittel</option>
                                <option value={105}>Niedrig</option>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-dialog-select-label"> Eintritts-WS </InputLabel>
                            <Select
                                labelId="demo-dialog-select-label"
                                id="demo-dialog-select"
                                value={occurence}
                                onChange={handelOccurenceChange}
                                input={<Input />}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={120}>Hoch</MenuItem>
                                <MenuItem value={113}>Mittel</MenuItem>
                                <MenuItem value={105}>Niedrig</MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handelAddRisk} color="primary">
                        Add Risk
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

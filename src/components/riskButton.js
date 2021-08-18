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
        setOpen(false);
    };

    const handelAddRisk = () => {

        props.editExpense(
            props.activeNote, {
                riskAuswirkung: auswirkung, 
                riskWahrscheinlichkeit: occurence}
    
  
        )
        handleClose()

    }

    return (
        <div>
            <Button
                onClick={handleClickOpen}
                color="secondary"
                variant="outlined"
                theme={theme}
             
           
            >Set Risk</Button>
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
                                <option value={10}>Hoch</option>
                                <option value={20}>Mittel</option>
                                <option value={30}>Niedrig</option>
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
                                <MenuItem value={10}>Hoch</MenuItem>
                                <MenuItem value={20}>Mittel</MenuItem>
                                <MenuItem value={30}>Niedrig</MenuItem>
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

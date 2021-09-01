import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DoubleCheckRemoveButton(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handelRemoveNote =() => {
    props.handelRemoveNote()
    handleClose()
}
    const propAcNote = props.activeNote

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                Remove
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Soll die Note gelöscht werden?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                            Project: {propAcNote.categorie}

                    </DialogContentText>

                    <DialogContentText id="alert-dialog-description">

                            {propAcNote.description}

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handelRemoveNote} color="secondary" variant="contained" autoFocus>
                        Löschen
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

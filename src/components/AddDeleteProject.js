import React from "react";
import { createTheme, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";
import { green } from "@material-ui/core/colors";
import { TextField } from "@material-ui/core";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
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

export default function AddDeleteProject(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [categorieName, setCategorieName] = React.useState("");
  const [categorieID, setCategorieID] = React.useState("");

  const handelCategorieChange = (event) => {
    setCategorieName(event.target.value);
  };

  const handelIDChange = (event) => {
    setCategorieID(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addCategorie = () => {
    props.setCategorie({
      catName: categorieName,
      catID: categorieID,
      sorting:
        1 +
        Math.max.apply(
          Math,
          props.categories.map((categorie) => categorie.sorting)
        ),
    }),
      handleClose();
    // props.SnackBar()
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        color="primary"
        startIcon={<AddCircleOutlineIcon fontSize="large" />}
      >
        Add Project
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Start New Project</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native"></InputLabel>

              <TextField
                onChange={handelIDChange}
                label="Project ID"
              ></TextField>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native"></InputLabel>

              <TextField
                onChange={handelCategorieChange}
                label="Project TItle"
              ></TextField>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={addCategorie} color="primary">
            Add Project
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import {
  TextField,
  Autocomplete,
  Button,
  ButtonBase,
  Grid,
  Card,
  ButtonGroup,
  IconButton,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  handelAddNote,
  handelRemoveNote,
  handelTakeChanges,
} from "../Button/AddNote";
import ClearIcon from "@mui/icons-material/Clear";

export function ShortDescription(properties) {
  const props = properties.NotesDashboradProps;
  const [activeNoteID, setActiveNoteID] = useState("");
  const [description, setDescription] = useState("");

  const [relevance, setrelevance] = useState("");
  const [important, setimportant] = useState("");
  const [noteDecscription, setnoteDecscription] = useState("");
  const [datesToFinish, setdatesToFinish] = useState("");
  const [nextStep, setnextStep] = useState("");
  const [infoNote, setinfoNote] = useState("");
  const [effort, seteffort] = useState("");
  const [noteStatus, setnoteStatus] = useState("");

  const [activeCategorie, setActiveCategorie] = useState("");
  const [inputCategorie, setInputCategorie] = useState("");

  // const [] = useState("")

  const space = "\n";
  const timeStamp = moment().format("ddd - DD.MM.YY");

  const clearInputValues = (props) => {
    props.removeActiveNote();
    setActiveNoteID("");
    setDescription("");
    setrelevance("");
    setimportant("");
    setnoteDecscription("");
    setdatesToFinish("");
    setnextStep("");
    setinfoNote("");
    seteffort("");
    setInputCategorie("");
    setActiveCategorie("");
  };

  if (props.activeNote != "" && props.activeNote[0].id != activeNoteID) {
    setActiveNoteID(props.activeNote[0].id);
    setDescription(props.activeNote[0].description);
    setrelevance(props.activeNote[0].relevance);
    setimportant(props.activeNote[0].important);
    setnoteDecscription(props.activeNote[0].noteDecscription);

    setInputCategorie(props.activeNote[0].categorie);
    setdatesToFinish(props.activeNote[0].datesToFinish);
    setnextStep(props.activeNote[0].nextStep);
    setinfoNote(props.activeNote[0].infoNote);
    seteffort(props.activeNote[0].effort);
    setnoteStatus(props.activeNote[0].noteStatus);
  }

  const updates = {
    id: activeNoteID,
    description: description,
    relevance: relevance,
    important: important,
    noteDecscription: space + timeStamp + space + noteDecscription,
    datesToFinish: datesToFinish,
    categorie: inputCategorie,
    nextStep: nextStep,
    infoNote: infoNote,
    effort: effort,
  };

  function statusChange(props, updates) {
    if (noteStatus === "open") {
      const noteStatus = { ...updates, ...{ noteStatus: "closed" } };
      handelTakeChanges(props, noteStatus);
    } else {
      const noteStatus = { ...updates, ...{ noteStatus: "open" } };
      handelTakeChanges(props, noteStatus);
    }
  }

  return (
    <div>
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid container item spacing={1}>
          <Grid item xs={1}>
          <IconButton>
            <ClearIcon onClick={() => clearInputValues(props)} />
          </IconButton>
          </Grid> 

          <Grid item xs={11}>
            <TextField
              label="Titel"
              variant="filled"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              color="secondary"
              fullWidth
              // inputProps={{
              //   style: {
              //     fontSize: 18,
              //   },
              // }}
            />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={4}>
            <Autocomplete
              value={activeCategorie}
              onChange={(e, newValue) => {
                setActiveCategorie(newValue);
              }}
              inputValue={
                inputCategorie
                  ? inputCategorie
                  : props.activeNote != ""
                  ? props.activeNote[0].categorie
                  : properties.activeCategorie.catName
              }
              onInputChange={(e, newInputValue) => {
                setInputCategorie(newInputValue);
              }}
              options={props.categories}
              getOptionLabel={(option) =>
                option.catName ? option.catName : ""
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Project"
                  variant="filled"
                  color="secondary"
                />
              )}
            />
          </Grid>

          <Grid item xs>
            <TextField
              label="Dringlich"
              variant="filled"
              value={relevance}
              onChange={(e) => setrelevance(e.target.value)}
              color="secondary"
              fullWidth
              // inputProps={{
              //   style: {
              //     fontSize: 18,
              //   },
              // }}
            />
          </Grid>
          <Grid item xs>
            <TextField
              label="Wichtig"
              variant="filled"
              color="secondary"
              value={important}
              onChange={(e) => setimportant(e.target.value)}
              fullWidth
              // inputProps={{
              //   style: {
              //     fontSize: 18,
              //   },
              // }}
            />
          </Grid>

          <Grid item xs>
            <TextField
              label="Aufwand"
              variant="filled"
              value={effort}
              onChange={(e) => seteffort(e.target.value)}
              color="secondary"
              fullWidth
              // inputProps={{
              //   style: {
              //     fontSize: 18,
              //   },
              // }}
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              label="Days"
              onChange={(e) =>
                setdatesToFinish(moment().add(e.target.value, "days"))
              }
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Finish Till"
              value={
                datesToFinish
                  ? moment(datesToFinish).format("ddd - DD.MM.YY")
                  : ""
              }
              onChange={(e) =>
                setdatesToFinish(moment().add(e.target.value, "days"))
              }
              variant="filled"
              color="secondary"
              fullWidth
              // inputProps={{
              //   style: {
              //     fontSize: 18,
              //   },
              // }}
            />
          </Grid>
        </Grid>

        <Grid container item spacing={1}>
          <TextField
            label="Note Description"
            variant="outlined"
            value={noteDecscription}
            onChange={(e) => setnoteDecscription(e.target.value)}
            margin="normal"
            color="secondary"
            minRows="10"
            multiline
            fullWidth
            // inputProps={{
            //   style: {
            //     fontSize: 16,
            //   },
            // }}
          />
        </Grid>
      </Grid>
      <ButtonGroup color="primary" variant="text">
        {activeNoteID ? (
          <Button
            variant="contained"
            onClick={() =>
              handelTakeChanges(props, updates) + clearInputValues(props)
            }
          >
            take Changes
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() =>
              handelAddNote(props, updates) + clearInputValues(props)
            }
          >
            Direkt Add
          </Button>
        )}
        <Button
          onClick={() =>
            // handelTakeChanges(props, updates) + clearInputValues(props)
            statusChange(props, updates) + clearInputValues(props)
          }
        >
          Satus Changes
        </Button>

        <Button onClick={() => clearInputValues(props)}>Clear</Button>

        <Button
          color="secondary"
          variant="contained"
          onClick={() =>
            handelRemoveNote(props, updates) + clearInputValues(props)
          }
        >
          Remove
        </Button>
      </ButtonGroup>
    </div>
  );
}

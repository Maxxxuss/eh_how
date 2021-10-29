import { TextField } from "@material-ui/core";
import { Button, ButtonBase, Grid } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  handelAddNote,
  handelRemoveNote,
  handelTakeChanges,
} from "../Button/AddNote";

export function ShortDescription(properties) {
  const props = properties.NotesDashboradProps;
  const [activeNoteID, setActiveNoteID] = useState("");
  const [description, setDescription] = useState("");

  const [relevance, setrelevance] = useState("");
  const [important, setimportant] = useState("");
  const [noteDecscription, setnoteDecscription] = useState("");
  const [datesToFinish, setdatesToFinish] = useState("");
  const [activeCategorieCatName, setactiveCategorieCatName] = useState("");
  const [nextStep, setnextStep] = useState("");
  const [infoNote, setinfoNote] = useState("");
  const [effort, seteffort] = useState("");
  const [noteStatus, setnoteStatus] = useState("");

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
    setactiveCategorieCatName("");
    setnextStep("");
    setinfoNote("");
    seteffort("");
  };

  if (props.activeNote != "" && props.activeNote[0].id != activeNoteID) {
    setActiveNoteID(props.activeNote[0].id);
    setDescription(props.activeNote[0].description);
    setrelevance(props.activeNote[0].relevance);
    setimportant(props.activeNote[0].important);
    setnoteDecscription(props.activeNote[0].noteDecscription);
    setdatesToFinish(props.activeNote[0].datesToFinish);
    setactiveCategorieCatName(props.activeNote[0].categorie);
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
    activeCategorieCatName: activeCategorieCatName,
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

  useEffect(
    () => console.log("Dates TO Finisch: ", datesToFinish),
    [datesToFinish]
  );

  return (
    <div>
      <Grid
        container
        spacing={1}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid container item spacing={1}>
          <TextField
            label="Titel"
            variant="filled"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            color="secondary"
            fullWidth
            inputProps={{
              style: {
                fontSize: 18,
              },
            }}
          />
        </Grid>

        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs>
            <TextField
              label="Dringlich"
              variant="filled"
              value={relevance}
              onChange={(e) => setrelevance(e.target.value)}
              color="secondary"
              fullWidth
              inputProps={{
                style: {
                  fontSize: 18,
                },
              }}
            />
          </Grid>
          <Grid item xs>
            <TextField
              label="Wichtig"
              variant="filled"
              value={important}
              // onChange={(e) => setimportant(e.target.value)}
              onSubmit={(e) => setimportant(e.target.value)}
              color="secondary"
              fullWidth
              inputProps={{
                style: {
                  fontSize: 18,
                },
              }}
            />
          </Grid>
          <Grid item xs>
            <TextField 
            label="Days"
            // value={}
            onChange={(e) =>
              setdatesToFinish(moment().add(e.target.value, "days"))
            }            
            />
            <TextField
              label="Finish Till"
              variant="filled"
              value={
                datesToFinish
                  ? moment(datesToFinish).format("ddd - DD.MM.YY")
                  : ""
              }
              onChange={(e) =>
                setdatesToFinish(moment().add(e.target.value, "days"))
              }
              color="secondary"
              fullWidth
              inputProps={{
                style: {
                  fontSize: 18,
                },
              }}
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
              inputProps={{
                style: {
                  fontSize: 18,
                },
              }}
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
            inputProps={{
              style: {
                fontSize: 16,
              },
            }}
          />
        </Grid>
      </Grid>

      {activeNoteID ? (
        <Button
          onClick={() =>
            handelTakeChanges(props, updates) + clearInputValues(props)
          }
        >
          take Changes
        </Button>
      ) : (
        <Button
          onClick={() =>
            handelAddNote(props, updates) + clearInputValues(props)
          }
        >
          Direkt Add
        </Button>
      )}

      <Button onClick={() => clearInputValues(props)}>Clear</Button>

      <Button
        onClick={() =>
          handelRemoveNote(props, updates) + clearInputValues(props)
        }
      >
        Remove
      </Button>

      <Button
        onClick={() =>
          // handelTakeChanges(props, updates) + clearInputValues(props)
          statusChange(props, updates) + clearInputValues(props)
        }
      >
        Satus Changes
      </Button>

      <Button
        onClick={() =>
          console.log(
            "props Shirt Description:",
            props.activeNote[0].noteStatus
          )
        }
      >
        Show Props
      </Button>
    </div>
  );
}
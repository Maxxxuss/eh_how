import { TextField } from "@material-ui/core";
import { Autocomplete, Button, ButtonBase, Grid } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  handelAddNote,
  handelRemoveNote,
  handelTakeChanges,
} from "../Button/AddNote";

export function ShortDescription(properties) {
  const props = properties.NotesDashboradProps;
  console.log("P0oprs Shjord Descriotn: ", properties);
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

  const [activeCategorie, setActiveCategorie] = useState("")
  const [inputCategorie, setInputCategorie] = useState("")


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
  
  };

  console.log("TITEL Properties: ", props.categories  );

  if (props.activeNote != "" && props.activeNote[0].id != activeNoteID) {
    setActiveNoteID(props.activeNote[0].id);
    setDescription(props.activeNote[0].description);
    setrelevance(props.activeNote[0].relevance);
    setimportant(props.activeNote[0].important);
    setnoteDecscription(props.activeNote[0].noteDecscription);
    setdatesToFinish(props.activeNote[0].datesToFinish);
    setnextStep(props.activeNote[0].nextStep);
    setinfoNote(props.activeNote[0].infoNote);
    seteffort(props.activeNote[0].effort);
    setnoteStatus(props.activeNote[0].noteStatus);
  }

  // if (
  //   properties.activeCategorie != "" &&
  //   properties.activeCategorie != undefined
  //   && props.activeNote !="" &&
  //   activeCategorie.id != properties.activeCategorie.id
  // ) {
  //   clearInputValues(props)

  //   setactiveCategorieCatName(properties.activeCategorie);
  // }

  // useEffect(()=> setactiveCategorieCatName(properties.activeCategorie.catName), [properties.activeCategorie.catName])
  // useEffect(
  //   () => console.log("USe Effect Fired, internal", activeCategorieCatName),
  //   [activeCategorieCatName]
  // );

  const updates = {
    id: activeNoteID,
    description: description,
    relevance: relevance,
    important: important,
    noteDecscription: space + timeStamp + space + noteDecscription,
    datesToFinish: datesToFinish,
    // categorie:,
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
              label="Days"
              onChange={(e) =>
                setdatesToFinish(moment().add(e.target.value, "days"))
              }
            />
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
              onChange={(e) => setimportant(e.target.value)}
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

        <Grid
          container
          //   direction="column"
          // justifyContent="center"
          // alignItems="center"
        >
          <Grid item xs={12}>
            <Autocomplete
              // value={activeCategorie}
              // onChange={(event, newValue) => {
              //   // setActiveCategorie(newValue);
              //   console.log("onChange Caluie:" , newValue);

              // }}
              inputValue={inputCategorie}
              onInputChange={(e, newInputValue) => {
                setInputCategorie(newInputValue ? newInputValue : "");
                  console.log("on Input Change: ", newInputValue);
              }}
              options={props.categories}
              getOptionLabel={(option) => (option.catName ? option.catName : "")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  color="secondary"
                  label="Project"
                />
              )}
            />

            {/* <Autocomplete
              id="combo-box-demo"
              options={props.categories}
              getOptionLabel={(option) => (option ? option.catName : [])}
              onInputChange={(e, newInputValue) => {
                setactiveCategorieCatName(newInputValue.catName);
              }}
              // onChange={(e, newInputValue) =>
              //   setactiveCategorieCatName(newInputValue.catName)
              // }
              inputValue={activeCategorieCatName

             
                // activeCategorieCatName
                //   ? activeCategorieCatName
                //   : props.activeCategorie !=undefined&& activeCategorie != undefined && activeCategorie.catName != ""
                //   ? activeCategorie.catName
                //   : ""


              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"Project"}
                  //  label="Project"
                  variant="outlined"
                  color="secondary"
                />
              )}
            /> */}
          </Grid>
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

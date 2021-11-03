import React, { useEffect, useState } from "react";
import {
  Box,
  MenuItem,
  Select,
  TextField,
  Autocomplete,
  Grid,
  FormControl,
  InputLabel,
} from "@mui/material";
import { setActiveNote } from "../NotesDashboard";
import { ShowNotes } from "../showNoteList";

export function SearchForNotes(properties) {
  const props = properties.props;

  const [filteredNotes, setFilteredNotes] = useState("");
  const [noteListStatus, setnoteListStatus] = useState("open");

  useEffect(() => setActiveNote(filteredNotes, props), [filteredNotes]);

  return (
    <Box>
      <Grid container direction="row">
        <Grid item xs={10}>
          <Autocomplete
            options={props.expenses}
            onChange={(event, expense) => {
              setFilteredNotes(expense);
            }}
            getOptionLabel={(filteredNotes) =>
              filteredNotes.description
                ? filteredNotes.description +
                  "  -  " +
                  filteredNotes.noteDecscription.substr(17, 235)
                : ""
            }
            style={{
              marginBottom: "10px",
              background: "rgba(238, 238, 238, 0.405)",
            }}
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label="Search Note" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item xs>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
            <Select
              value={noteListStatus}
              label="Filter"
              onChange={(e) => setnoteListStatus(e.target.value)}
            >
              <MenuItem value={"open"}>Open</MenuItem>
              <MenuItem value={"allOpen"}>Just Do´s</MenuItem>
              <MenuItem value={"closed"}>closed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid item xs>
        <ShowNotes
          props={props}
          expenses={props.expenses}
          activeCategorie={properties.activeCategorie}
          noteListStatus={noteListStatus}
        />
      </Grid>
    </Box>
  );
}

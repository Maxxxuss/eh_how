import React, { useEffect, useState } from "react";
import { setActiveNote } from "./NotesDashboard";
import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
  Divider,
  MenuItem,
  Select,
  Grid,
  FormControl,
  InputLabel,
} from "@mui/material";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";

const showHintForTimedNotes = (expense) => {
  const days = expense.absDatesToFinish;

  const daySubStrin = parseInt(days);

  if (days > -0.4 && days < 0.6) {
    return (
      <p
        style={{
          color: "Green",
          backgroundColor: "ghostWhite",
        }}
      >
        Do-Today
      </p>
    );
  }
  if (days < -0.4) {
    return (
      <p
        style={{
          color: "DarkRed",
          backgroundColor: "Orange",
        }}
      >
        "Done till "{daySubStrin} Days
      </p>
    );
  } else {
    return <p></p>;
  }
};

export function FilteredNotesList(properties) {
  console.log("Properties", properties);
  const props = properties.props;
  const [noteListStatus, setnoteListStatus] = useState("open");
  const [filteredNotes, setFilteredNotes] = useState(props.expenses);

  // useEffect(
  //   () =>
  //     setFilteredNotes(
  //       noteListStatus === "allOpen"
  //         ? props.expenses.filter(
  //             (expense) =>
  //               expense.noteStatus === "open" &&
  //               expense.absDatesToFinish < "0.6"
  //           )
  //         : props.expenses.filter(
  //             (expense) => expense.noteStatus === noteListStatus
  //           )
  //     ),
  //   // console.log("UseEffect Fired")
  //   [noteListStatus]
  // );

  return (
    <div>
      <Grid item>
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
        <ShowNotes noteListStatus={noteListStatus} props={props} activeCategorie={properties.activeCategorie}/>
      </Grid>
    </div>
  );
}

export function ShowNotes(props) {
  const expenses = props.props.expenses;
  const noteListStatus = props.noteListStatus;

  const [selectedIndex, setSelectedIndex] = useState("");

  const handleListItemClick = (expense, props, event, index) => {
    setSelectedIndex(index);
    setActiveNote(expense, props.props);
  };

  return (
    <List>
      {expenses
        .filter((expense) =>
          noteListStatus != "allOpen"
            ? expense.noteStatus === noteListStatus
            : expense.noteStatus === "open" && expense.absDatesToFinish < "0.6"
        )
        .filter((expense)=>
        props.activeCategorie === undefined
       ? expense
       :  expense.categorie === props.activeCategorie.catName
        )
        .map((expense, index) => {
          const labelId = expense.id;
          return (
            <ListItem
              key={expense.id}
              // secondaryAction={
              //   <Checkbox
              //     edge="end"
              //     // onChange={handleToggle(value)}
              //     // checked={checked.indexOf(value) !== -1}
              //     // inputProps={{ 'aria-labelledby': labelId }}
              //   />
              // }
              // disablePadding
            >
              <ListItemButton
                selected={selectedIndex === index}
                onClick={(event) =>
                  //
                  // &&
                  handleListItemClick(expense, props, event, index)
                }
              >
                {/* <NotificationImportantIcon/> */}
                {showHintForTimedNotes(expense)}

                <ListItemText
                  id={expense.id}
                  primary={expense.description}
                  secondary={expense.noteDecscription.substr(16, 80)}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
    </List>
  );

  // return (
  //   expenses
  //     // .filter((expense) => expense.noteStatus === noteListStatus )
  //     .filter((expense) =>
  //       noteListStatus != "allOpen"
  //         ? expense.noteStatus === noteListStatus
  //         : expense.noteStatus === "open" && expense.absDatesToFinish < "1.0"
  //     )
  //     .map((expense) => (
  //       <li
  //         key={expense.id}
  //         onClick={() => setActiveNote(expense, props.props)}
  //         style={{
  //           marginBottom: "8px",
  //         }}
  //       >
  //         <div className="noteListStylInt">
  //           {Math.round(expense.prio)} {expense.categorie} -{" "}
  //           {expense.description} -
  //           {expense.infoNote === true ? (
  //             <span
  //               style={{
  //                 color: "red",
  //                 backgroundColor: "yellow",
  //               }}
  //             >
  //               info
  //             </span>
  //           ) : (
  //             ""
  //           )}{" "}
  //           -
  //           {expense.riskAuswirkung != "" ||
  //           expense.riskWahrscheinlichkeit != "" ? (
  //             <span
  //               style={{
  //                 color: "yellow",
  //                 backgroundColor: "red",
  //               }}
  //             >
  //               Risk
  //             </span>
  //           ) : (
  //             ""
  //           )}{" "}
  //           -{showHintForTimedNotes(expense)}
  //           <p>{expense.noteDecscription.substr(16, 80)}</p>
  //         </div>
  //       </li>
  //     ))
  // );
}

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
  Paper,
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


export function ShowNotes(props) {
  const expenses = props.expenses;
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
        .filter((expense) =>
          props.activeCategorie.catName === "ALL"
            ? expense
            : expense.categorie === props.activeCategorie.catName
        )
        .map((expense, index) => {
          const labelId = expense.id;
          return (
            <Paper key={expense.id} elevation={6}>
              <ListItem key={expense.id}>
                <ListItemButton
                  selected={selectedIndex === index}
                  onClick={(event) =>
                    handleListItemClick(expense, props, event, index)
                  }
                >
                  {showHintForTimedNotes(expense)}

                  <ListItemText
                    id={expense.id}
                    primary={expense.description}
                    secondary={expense.noteDecscription.substr(16, 80)}
                  />
                </ListItemButton>
              </ListItem>
            </Paper>
          );
        })}
    </List>
  );
}

import { v4 as uuidv4 } from "uuid";

// ADD_ACTIVE_NOTE
export const addActiveNote = ({
  id,
  description,
  relevance,
  important,
  noteDecscription,
  datesToFinish,
  calenderFocused,
  categorie,
  noteUpdateDate,
  noteStatus,
  nextStep,
  riskAuswirkung,
  riskWahrscheinlichkeit,
  infoNote,
  journalNote,
  snooze,
  onHold,
  effort,
} = {}) => ({
  type: "ADD_ACTIVE_NOTE",
  activeNote: {
    id,
    description,
    relevance,
    important,
    noteDecscription,
    datesToFinish,
    calenderFocused,
    relevance,
    categorie,
    noteUpdateDate,
    noteStatus,
    nextStep,
    riskAuswirkung,
    riskWahrscheinlichkeit,
    infoNote,
    journalNote,
    snooze,
    onHold,
    effort,
  },
});

// export const addActiveNote=({updates}) =>({
//   type: "ADD_ACTIVE_NOTE",
//   updates
// })

// REMOVE_ACTIVE_NOTE
export const removeActiveNote = () => ({
  type: "REMOVE_ACTIVE_NOTE",
  activeNote:""
  
});
// export const removeActiveNote = ({ id } = {}) => {
//   return (dispatch) => {
//     dispatch(({
//       type: 'REMOVE_ACTIVE_NOTE',
//       id

//     }));
//   }
// }

// EDIT_ACTIVE_NOTE
export const editActiveNote = (id, updates) => ({
  type: "EDIT_ACTIVE_NOTE",
  id,
  updates,
});

export const changeStatus = (id, updates) => ({
  type: "CHANGE_STATUS",
  id,
  updates,
});

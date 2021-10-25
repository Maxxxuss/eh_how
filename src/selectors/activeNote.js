import { createSelector } from "reselect";
import moment from "moment";

export const getActiveNotes = (state) => state.activeNote;

export const getAllActiveNotes = createSelector(getActiveNotes, (activeNotes) =>
  activeNotes.map((activeNote) => ({
    id: activeNote.id ? activeNote.id : "",
    categorie: activeNote.categorie ? activeNote.categorie : "",
    noteUpdateDate: activeNote.noteUpdateDate
      ? activeNote.noteUpdateDate
      : "",
    noteStatus: activeNote.noteStatus ? activeNote.noteStatus : "",
    description: activeNote.description ? activeNote.description : "",
    prio: activeNote.prio ? activeNote.prio : "",
    sRelevance: activeNote.sRelevance ? activeNote.sRelevance : "",
    relevance: activeNote.relevance ? activeNote.relevance : "",
    important: activeNote.important ? activeNote.important : "",
    noteDecscription: activeNote.noteDecscription
      ? activeNote.noteDecscription
      : "",
    datesToFinish: activeNote.datesToFinish ? activeNote.datesToFinish : "",
    nextStep: activeNote.nextStep ? activeNote.nextStep : "",
    riskAuswirkung: activeNote.riskAuswirkung
      ? activeNote.riskAuswirkung
      : "",
    riskWahrscheinlichkeit: activeNote.riskWahrscheinlichkeit
      ? activeNote.riskWahrscheinlichkeit
      : "",
    infoNote: activeNote.infoNote ? activeNote.infoNote : "",
    journalNote: activeNote.journalNote ? activeNote.journalNote : "",
    snooze: activeNote.snooze ? activeNote.snooze : "",
    onHold: activeNote.onHold ? activeNote.onHold : "",
    effort: activeNote.effort ? activeNote.effort : "",
  }))
);


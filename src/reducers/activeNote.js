const activeNoteReducerDefaultState = [];

const activeNoteReducer = (state = activeNoteReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_ACTIVE_NOTE':
      return [
        ...state,
        action.activeNote
      ];
    case 'REMOVE_ACTIVE_NOTE':
      // return (state={})=>state;
      return state=[]

      // return [
        //   ...state,
        //   action.activeNote
      // ];
    // case 'EDIT_ACTIVE_NOTE':
    //   return state.map((activeNote) => {
    //     if (activeNote.id === action.id) {
    //       return {
    //         ...activeNote,
    //         ...action.updates
    //       };
    //     } else {
    //       return activeNote;
    //     };
    //   });
    default:
      return state;
  }
};

export default activeNoteReducer
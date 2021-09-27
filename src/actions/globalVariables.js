import { v4 as uuidv4 } from "uuid";

// ADD_GLOBALVARIABLES
export const addGlobalVariables = ({
} = {}) => ({
  type: "ADD_GLOBALVARIABLES",
  globalVariables: {
      autoSave,  
  },
});

// REMOVE_GLOBALVARIABLES
// export const removeGlobalVariables = ({ id } = {}) => ({
//   type: "REMOVE_GLOBALVARIABLES",
//   id,
// });
// export const removeGlobalVariables = ({ id } = {}) => {
//   return (dispatch) => {
//     dispatch(({
//       type: 'REMOVE_GLOBALVARIABLES',
//       id

//     }));
//   }
// }

// EDIT_GLOBALVARIABLES
export const editGlobalVariables = ( autoSave) => ({
  type: "EDIT_GLOBALVARIABLES",
  autoSave
  
});

// export const changeStatus = (id, updates) => ({
//   type: "CHANGE_STATUS",
//   id,
//   updates,
// });

const globalVariablesDefaultState = {
    autoSave : 1

}

const globalVariabels = (state = globalVariablesDefaultState, action) => {
    switch (action.type) {
        case 'SET_GLOBALVARIABLES':
            return [
                ...state,
                action.globalVariables
            ];

        // case 'EDIT_GLOBALVARIABLES':
        //     return state.map((globalVariables) => {
        //         if (globalVariables.id === action.id) {
        //             return {
        //                 ...globalVariables,
        //                 ...action.updates
        //             };
        //         } else {
        //             return globalVariables;
        //         };
        //     });

            case 'EDIT_GLOBALVARIABLES':
                return {
                    ...state,
                    autoSave: action.autoSave 
                }
                

        case 'REMOVE_GLOBALVARIABLES':
            return state.filter(({ id }) => id !== action.id);
        default:
            return state
    }
}

export default globalVariabels
import { createSelector } from "reselect"

export const getGlobalVariables = (state) => state.globalVariables 

export const getAllGlobalVariables = createSelector(getGlobalVariables,
    globalVariables => globalVariables.map(globalVariable => ({
        autoSave: globalVariable.autoSave ? globalVariable.autoSave : 2,
        onOffSwitch: globalVariable.onOffSwitch ? globalVariable.onOffSwitch : true

    }))
)

    
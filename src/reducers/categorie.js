const categorieDefaultState = []

const categorieReducer = (state = categorieDefaultState, action)=> {
switch (action.type) {
    case  'SET_CATEGORIE': 
    return [
        ...state, 
        action.categorie
    ]
    default: 
    return state
}
}

export default categorieReducer
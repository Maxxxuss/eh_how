const categorieDefaultState = []

const categorieReducer = (state = categorieDefaultState, action) => {
    switch (action.type) {
        case 'SET_CATEGORIE':
            return [
                ...state,
                action.categorie
            ];

        case 'REMOVE_CATEGORIE':
            return state.filter(({ id }) => id !== action.id);
        default:
            return state
    }
}

export default categorieReducer
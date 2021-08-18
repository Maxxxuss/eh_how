const categorieDefaultState = []

const categorieReducer = (state = categorieDefaultState, action) => {
    switch (action.type) {
        case 'SET_CATEGORIE':
            return [
                ...state,
                action.categorie
            ];

        case 'EDIT_CATEGORIE':
            return state.map((categorie) => {
                if (categorie.id === action.id) {
                    return {
                        ...categorie,
                        ...action.updates
                    };
                } else {
                    return categorie;
                };
            });

        case 'REMOVE_CATEGORIE':
            return state.filter(({ id }) => id !== action.id);
        default:
            return state
    }
}

export default categorieReducer
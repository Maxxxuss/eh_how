
import { v4 as uuidv4 } from 'uuid';


export const setCategorie = (
    {
        catName, 
        details,
    } = {}
) => ({
    type: 'SET_CATEGORIE', 
    categorie: {
        id: uuidv4(), 
        catName, 
        details
    }
})
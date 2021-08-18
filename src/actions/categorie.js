
import { v4 as uuidv4 } from 'uuid';


export const setCategorie = (
    {
        catName, 
        details,
        catID,
        m1,
        m2,
        m3,
        m4,
        aktStand,
        nextSteps,
        challenges,
        journal,
    } = {}
) => ({
    type: 'SET_CATEGORIE', 
    categorie: {
        id: uuidv4(), 
        catName, 
        details,
        catID,
        m1,
        m2,
        m3,
        m4,
        aktStand,
        nextSteps,
        challenges,
        journal,
    }
})

export const editCategorie = (id, updates) =>
({
  type: 'EDIT_CATEGORIE',
  id,
  updates, 
}
);



export const removeCategorie = ({ id } = {}) => {
    return (dispatch) => {
      dispatch(({ 
        type: 'REMOVE_CATEGORIE',
        id
        
       }));
    }
  }
  
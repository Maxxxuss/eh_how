
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
    sorting,

    //historyCategorie
    m1_1,
    m2_1,
    m3_1,
    m4_1,
    m1_2,
    m2_2,
    m3_2,
    m4_2,

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
    sorting,
    //historyCategorie
    m1_1,
    m2_1,
    m3_1,
    m4_1,
    m1_2,
    m2_2,
    m3_2,
    m4_2,
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

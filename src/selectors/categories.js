import { createSelector } from 'reselect';

export const getCategories = state => state.categories;

export const getAllCategories = createSelector(
    getCategories,
    categories => categories.map(categorie => ({
        id: categorie.id ? categorie.id : "", 
        catName: categorie.catName ? categorie.catName : "",
        details: categorie.details ? categorie.details : "",
        catID: categorie.catID ? categorie.catID : "",
        m1: categorie.m1 ? categorie.m1 : "",
        m2: categorie.m2 ? categorie.m2 : "",
        m3: categorie.m3 ? categorie.m3 : "",
        m4: categorie.m4 ? categorie.m4 : "",
        aktStand: categorie.aktStand ? categorie.aktStand : "",
        nextSteps: categorie.nextSteps ? categorie.nextSteps : "",
        challenges: categorie.challenges ? categorie.challenges : "",
        journal: categorie.journal ? categorie.journal : "",
    }))
);

export const getHistorieCategorie = createSelector(
    getCategories, 
    categories => categories.map(historyCategorie => ({
      hid : historyCategorie.id ? historyCategorie.id : "", 
      m1_1: historyCategorie.m1_1 ? historyCategorie.m1_1  :"",
      m2_1: historyCategorie.m2_1 ? historyCategorie.m2_1  :"",
      m3_1: historyCategorie.m3_1 ? historyCategorie.m3_1  :"",
      m4_1: historyCategorie.m4_1 ? historyCategorie.m4_1  :"", 
      m1_2: historyCategorie.m1_1 ? historyCategorie.m1_2  :"",
      m2_2: historyCategorie.m2_1 ? historyCategorie.m2_2  :"",
      m3_2: historyCategorie.m3_1 ? historyCategorie.m3_2  :"",
      m4_2: historyCategorie.m4_1 ? historyCategorie.m4_2  :"", 
  
  
    })
  
    )
  )
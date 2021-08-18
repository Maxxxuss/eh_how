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


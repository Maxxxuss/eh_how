import { createSelector } from 'reselect';

export const getCategories = state => state.categories;

export const getAllCategories = createSelector(
    getCategories,
    categories => categories.map(categorie => ({
        id: categorie.id ? categorie.id : "", 
        catName: categorie.catName ? categorie.catName : "",
        details: categorie.details ? categorie.details : "",
    }))
);


import { SEARCH_ARTICLES } from './types';

export const searchArticles = (searchTerms) => {
    return (dispatch) => {
        dispatch({
            type: SEARCH_ARTICLES,
            payload: searchTerms
        });
    }
};
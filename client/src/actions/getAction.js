import { GET_SEARCH_TERMS } from './types';

export const getSearchTerms = () => {
    return (dispatch) => {
        dispatch({
            type: GET_SEARCH_TERMS,
            payload: ''
        });
    }
}
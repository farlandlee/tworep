import { SEARCH_ARTICLES, ARTICLES_RETURNED, ARTICLES_ERROR } from '../actions/types'
import api from '../api'

// https://stackoverflow.com/a/1714899/704647
const serialize = (obj) => {
    let str = []
    for (let p in obj)
        if (obj.hasOwnProperty(p) && obj[p] !== '') {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
        }
    return str.join("&")
}

const fetchArticles = (dispatch, getState) => {
    const terms = getState().searchState.searchTerms
    // need to check if search was empty
    const isEmpty = !Object.values(terms).some(x => (x !== null && x !== ''))
    if(isEmpty) {
        dispatch({ 
            type: ARTICLES_ERROR, 
            payload: "Please provide at least one search parameter or go to Volumes to see the entire collection of articles." 
        })
        return
    }
    const searchString = serialize(terms)
    api.getArticlesByQuery(searchString)
    .then((results) => {
        dispatch({ 
            type: ARTICLES_RETURNED, 
            payload: results.data 
        })
    })
    .catch(error => {
        console.log(error)
        dispatch({ 
            type: ARTICLES_ERROR, 
            payload: error 
        })
    })
}


const fetchArticlesMiddleware = storeAPI => next => action => {
    if (action.type === SEARCH_ARTICLES) {
        fetchArticles(storeAPI.dispatch,storeAPI.getState)
    }
    return next(action)
}

export default fetchArticlesMiddleware
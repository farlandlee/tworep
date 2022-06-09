import { ARTICLES_RETURNED } from './types'

const articlesReturned = (articles) => {
    return (dispatch) => {
        dispatch({
            type: ARTICLES_RETURNED,
            payload: articles
        })
    }
}

export default articlesReturned
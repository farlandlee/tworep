import { ARTICLES_ERROR } from './types'

const articlesError = (error) => {
    return (dispatch) => {
        dispatch({
            type: ARTICLES_ERROR,
            payload: error
        })
    }
}

export default articlesError
import { 
    SEARCH_ARTICLES, 
    GET_SEARCH_TERMS,
    ARTICLES_RETURNED, 
    ARTICLES_ERROR 
} from "../actions/types"

const initialState = {
    searchTerms: {
        includes: '',
        startDate: '',
        endDate: '',
        volume_number: '',
        publication: '',
        excludes: '',
    },
    articles: [],
    message: '',
    searched: false,
    error: false
}

const searchReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SEARCH_TERMS:
            return {
                ...state,
                searched: false,
                articles: [],
                error: false
            }
        case SEARCH_ARTICLES:
            return {
                ...state,
                searched: false,
                articles: []
            }
        case ARTICLES_RETURNED:
            return {
                ...state,
                searched: true,
                articles: action.payload.articles,
                message: action.payload.message,
                error: false
            }
        case ARTICLES_ERROR:
            return {
                ...state,
                searched: true,
                articles: [],
                error: action.payload
            }
        default:
            return state
    }
}

export default searchReducer
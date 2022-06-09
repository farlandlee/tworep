import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import fetchArticlesMiddleware from './middleware/fetchArticlesMiddleware';

let preloadedState
const persistedsearchTermsString = localStorage.getItem('searchTerms')

if (persistedsearchTermsString) {
  preloadedState = {
    searchTerms: JSON.parse(persistedsearchTermsString)
  }
}

const middleware = [thunk,fetchArticlesMiddleware]

const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
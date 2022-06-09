import { combineReducers } from 'redux';
import searchReducer from './searchReducer';

export default combineReducers({
    // Define a top-level state field named `searchState`, handled by `searchReducer`
    searchState: searchReducer
});
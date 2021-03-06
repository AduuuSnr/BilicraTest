import {createStore, combineReducers} from 'redux';
import app from './app/reducer';
const rootReducer = combineReducers({app});
const store = createStore(rootReducer);

export default store;

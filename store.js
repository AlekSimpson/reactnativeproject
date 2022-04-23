import { createStore } from 'redux';
import printersReducer from './printersReducer.js';
import printerDictReducer from './PrinterDictReducer.js';
import { combineReducers } from 'redux'
import rootReducer from './rootReducer.js';


const store = createStore(rootReducer);//printersReducer


export default store;
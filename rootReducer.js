import { combineReducers } from 'redux'
import printersReducer from './printersReducer'
import printerImageDictReducer from './PrinterDictReducer'

const rootReducer =  combineReducers({
    listP: printersReducer,
    imageDict: printerImageDictReducer
})

export default rootReducer;
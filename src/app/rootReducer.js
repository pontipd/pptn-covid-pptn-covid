import { combineReducers } from '@reduxjs/toolkit'

import userReducer from './reducer/userSlice'
import counterReducer from './reducer/counterSlice'

const rootReducer = combineReducers({
    user: userReducer,
    counter: counterReducer,
})

export default rootReducer
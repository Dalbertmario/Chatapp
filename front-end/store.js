import {configureStore} from '@reduxjs/toolkit'
import uiReducer from '../front-end/src/ui/uistore'

const store = configureStore({
    reducer:{
        uistore:uiReducer
    }
})

export default store
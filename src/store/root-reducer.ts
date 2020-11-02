import { combineReducers } from '@reduxjs/toolkit'
import {
    imageSearchReducer,
    initialImageSearchState,
} from './image-search-slice'

const rootReducer = combineReducers({
    imageSearch: imageSearchReducer,
})
export type AppState = ReturnType<typeof rootReducer>

export const initialAppState: AppState = {
    imageSearch: initialImageSearchState,
}

export default rootReducer

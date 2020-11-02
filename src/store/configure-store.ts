import { configureStore } from '@reduxjs/toolkit'
import rootReducer, { AppState, initialAppState } from './root-reducer'

export const getStore = (stateSettings?: Partial<AppState>) => {
    if (stateSettings) {
        return configureStore({
            reducer: rootReducer,
            preloadedState: { ...initialAppState, ...stateSettings },
        })
    } else {
        return configureStore({ reducer: rootReducer })
    }
}

const store = getStore()
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export default store

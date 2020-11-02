import React, { ReactElement } from 'react'
import { AppStore } from './configure-store'
import { Provider } from 'react-redux'

export const withStore = (store: AppStore, component: ReactElement) => {
    return <Provider store={store}>{component}</Provider>
}

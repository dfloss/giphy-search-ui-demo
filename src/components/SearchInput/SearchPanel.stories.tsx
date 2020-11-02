import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { SearchPanel } from './SearchPanel'
import { AppStore, getStore } from 'store/configure-store'
import { Provider } from 'react-redux'
import giphySearch4Results from 'services/giphy/mocks/giphy-search-4-results.json'
import { setGiphySearchMock } from 'services/giphy/mocks/set-giphy-search-mock'

export default {
    title: 'Search Panel',
    component: SearchPanel,
    args: {
        store: getStore(),
    },
} as Meta

export const searchPanel = ({ store }: { store: AppStore }) => {
    setGiphySearchMock(giphySearch4Results)
    return (
        <Provider store={store}>
            <SearchPanel />
        </Provider>
    )
}

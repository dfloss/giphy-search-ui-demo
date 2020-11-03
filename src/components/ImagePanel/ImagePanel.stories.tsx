import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { ImagePanel } from './ImagePanel'
import { AppStore, getStore } from 'store/configure-store'
import { Provider } from 'react-redux'
import { AppState, initialAppState } from 'store/root-reducer'
import { initialImageSearchState } from 'store/image-search-slice'

export default {
    title: 'Image Panel',
    component: ImagePanel,
    args: {
        store: getStore(),
    },
    excludeStories: ['imagePanelStoryTemplate'],
} as Meta

const getImageSearchStateStore = (
    imageSearchStateSettings: Partial<AppState['imageSearch']>
) => {
    return getStore({
        ...initialAppState,
        imageSearch: {
            ...initialImageSearchState,
            ...imageSearchStateSettings,
        },
    })
}

export const imagePanelStoryTemplate = (store: AppStore) => {
    return (
        <Provider store={store}>
            <ImagePanel />
        </Provider>
    )
}

export const initial = () => {
    const store = getStore()
    return imagePanelStoryTemplate(store)
}

export const noResults = () => {
    const store = getImageSearchStateStore({
        searchText: 'first search',
        areResultsRemaining: false,
    })
    return imagePanelStoryTemplate(store)
}

export const allResultsLoaded = () => {
    const store = getImageSearchStateStore({
        searchText: 'search',
        areResultsRemaining: false,
        images: [
            // { url: 'llama1.gif', alt: 'llama one' },
            // { url: 'llama2.gif', alt: 'llama two' },
            // { url: 'llama3.gif', alt: 'llama three' },
        ],
    })
    return imagePanelStoryTemplate(store)
}

export const moreResultsCanBeLoaded = () => {
    const store = getImageSearchStateStore({
        searchText: 'search',
        areResultsRemaining: true,
        images: [
            // { url: 'llama1.gif', alt: 'llama one' },
            // { url: 'llama2.gif', alt: 'llama two' },
            // { url: 'llama3.gif', alt: 'llama three' },
        ],
    })
    return imagePanelStoryTemplate(store)
}

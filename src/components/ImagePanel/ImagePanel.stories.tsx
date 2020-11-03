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
        totalResultsCount: 0,
    })
    return imagePanelStoryTemplate(store)
}

export const threeResults = () => {
    const store = getImageSearchStateStore({
        searchText: 'vicuna',
        totalResultsCount: 3,
        images: [
            {
                url: 'llama1.gif',
                alt: 'llama one',
                imageWidth: 480,
                imageHeight: 271,
            },
            {
                url: 'llama2.gif',
                alt: 'llama two',
                imageWidth: 300,
                imageHeight: 225,
            },
            {
                url: 'llama3.gif',
                alt: 'llama three',
                imageWidth: 400,
                imageHeight: 225,
            },
        ],
    })
    return imagePanelStoryTemplate(store)
}

export const twentyResults = () => {
    const mockState = {
        imageSearch: {
            searchText: 'cats',
            images: [
                {
                    url:
                        'https://media3.giphy.com/media/SJk9xTbxcg0DFDs89d/200w.gif?cid=0dab75ccud0l9rnk1ynydum6xgaopws9gw2vpwbsss5t5qqv&rid=200w.gif',
                    alt: 'cats fighting GIF',
                    imageHeight: 239,
                    imageWidth: 200,
                },
                {
                    url:
                        'https://media1.giphy.com/media/9GIFGeuuinRxgEj7Zq/200w.gif?cid=0dab75ccud0l9rnk1ynydum6xgaopws9gw2vpwbsss5t5qqv&rid=200w.gif',
                    alt: 'cute cats GIF',
                    imageHeight: 200,
                    imageWidth: 200,
                },
                {
                    url:
                        'https://media1.giphy.com/media/ND6xkVPaj8tHO/200w.gif?cid=0dab75ccud0l9rnk1ynydum6xgaopws9gw2vpwbsss5t5qqv&rid=200w.gif',
                    alt: 'funny cat GIF',
                    imageHeight: 186,
                    imageWidth: 200,
                },
                {
                    url:
                        'https://media0.giphy.com/media/JfLdIahamXQI0/200w.gif?cid=0dab75cc6qc9cwlxclb2fp0vcpoufmo8af7df0ybgkz5xg5q&rid=200w.gif',
                    alt: 'cat fail falling GIF',
                    imageHeight: 153,
                    imageWidth: 200,
                },
                {
                    url:
                        'https://media4.giphy.com/media/OmK8lulOMQ9XO/200w.gif?cid=0dab75cc6qc9cwlxclb2fp0vcpoufmo8af7df0ybgkz5xg5q&rid=200w.gif',
                    alt: 'cute cat GIF',
                    imageHeight: 200,
                    imageWidth: 200,
                },
                {
                    url:
                        'https://media1.giphy.com/media/GwGXoeb0gm7sc/200w.gif?cid=0dab75cc6qc9cwlxclb2fp0vcpoufmo8af7df0ybgkz5xg5q&rid=200w.gif',
                    alt: 'Cat GIF',
                    imageHeight: 113,
                    imageWidth: 200,
                },
                {
                    url:
                        'https://media3.giphy.com/media/6VoDJzfRjJNbG/200w.gif?cid=0dab75cc6qc9cwlxclb2fp0vcpoufmo8af7df0ybgkz5xg5q&rid=200w.gif',
                    alt: 'cat pounce GIF',
                    imageHeight: 137,
                    imageWidth: 200,
                },
                {
                    url:
                        'https://media0.giphy.com/media/1ViLp0GBYhTcA/200w.gif?cid=0dab75cc6qc9cwlxclb2fp0vcpoufmo8af7df0ybgkz5xg5q&rid=200w.gif',
                    alt: 'lil bub cat GIF',
                    imageHeight: 193,
                    imageWidth: 200,
                },
                {
                    url:
                        'https://media4.giphy.com/media/UotLuplZSzKRa/200w.gif?cid=0dab75cc6qc9cwlxclb2fp0vcpoufmo8af7df0ybgkz5xg5q&rid=200w.gif',
                    alt: 'International Cat Day Fighting GIF',
                    imageHeight: 356,
                    imageWidth: 200,
                },
                {
                    url:
                        'https://media4.giphy.com/media/5scVaYq4hKA7u/200w.gif?cid=0dab75cc6qc9cwlxclb2fp0vcpoufmo8af7df0ybgkz5xg5q&rid=200w.gif',
                    alt: 'cat GIF',
                    imageHeight: 112,
                    imageWidth: 200,
                },
                {
                    url:
                        'https://media0.giphy.com/media/10rW4Xw9eO0RmU/200w.gif?cid=0dab75cc6qc9cwlxclb2fp0vcpoufmo8af7df0ybgkz5xg5q&rid=200w.gif',
                    alt: 'cat sleeping GIF',
                    imageHeight: 150,
                    imageWidth: 200,
                },
                {
                    url:
                        'https://media1.giphy.com/media/11c7UUfN4eoHF6/200w.gif?cid=0dab75cc6qc9cwlxclb2fp0vcpoufmo8af7df0ybgkz5xg5q&rid=200w.gif',
                    alt: 'cat GIF',
                    imageHeight: 188,
                    imageWidth: 200,
                },
                {
                    url:
                        'https://media0.giphy.com/media/9gISqB3tncMmY/200w.gif?cid=0dab75cc6qc9cwlxclb2fp0vcpoufmo8af7df0ybgkz5xg5q&rid=200w.gif',
                    alt: 'star wars cats GIF',
                    imageHeight: 112,
                    imageWidth: 200,
                },
                {
                    url:
                        'https://media3.giphy.com/media/l0NwN7CLIEBQu0kkU/200w.gif?cid=0dab75cc6qc9cwlxclb2fp0vcpoufmo8af7df0ybgkz5xg5q&rid=200w.gif',
                    alt: 'episode 2 cats GIF by The X-Files',
                    imageHeight: 111,
                    imageWidth: 200,
                },
                {
                    url:
                        'https://media1.giphy.com/media/b5XJRNBrvgVHjkTsRV/200w.gif?cid=0dab75cc6qc9cwlxclb2fp0vcpoufmo8af7df0ybgkz5xg5q&rid=200w.gif',
                    alt: 'cats treadmill GIF',
                    imageHeight: 200,
                    imageWidth: 200,
                },
                {
                    url:
                        'https://media2.giphy.com/media/ue4rk7zGOW2Qg/200w.gif?cid=0dab75cc6qc9cwlxclb2fp0vcpoufmo8af7df0ybgkz5xg5q&rid=200w.gif',
                    alt: 'bearded dragons cat GIF',
                    imageHeight: 150,
                    imageWidth: 200,
                },
                {
                    url:
                        'https://media4.giphy.com/media/ngs9Nqu0pqkec/200w.gif?cid=0dab75cc6qc9cwlxclb2fp0vcpoufmo8af7df0ybgkz5xg5q&rid=200w.gif',
                    alt: 'cats falling off GIF',
                    imageHeight: 138,
                    imageWidth: 200,
                },
                {
                    url:
                        'https://media1.giphy.com/media/a34HjLEsKchWM/200w.gif?cid=0dab75cc6qc9cwlxclb2fp0vcpoufmo8af7df0ybgkz5xg5q&rid=200w.gif',
                    alt: 'cat GIF',
                    imageHeight: 255,
                    imageWidth: 200,
                },
                {
                    url:
                        'https://media1.giphy.com/media/aEXP6scfSSwQo/200w.gif?cid=0dab75cc6qc9cwlxclb2fp0vcpoufmo8af7df0ybgkz5xg5q&rid=200w.gif',
                    alt: 'best friends cats GIF',
                    imageHeight: 150,
                    imageWidth: 200,
                },
                {
                    url:
                        'https://media1.giphy.com/media/RBBWIAfTzuHxS/200w.gif?cid=0dab75cc6qc9cwlxclb2fp0vcpoufmo8af7df0ybgkz5xg5q&rid=200w.gif',
                    alt: 'cat GIF',
                    imageHeight: 104,
                    imageWidth: 200,
                },
                {
                    url:
                        'https://media2.giphy.com/media/V4NnsmEY7hsK4/200w.gif?cid=0dab75cc6qc9cwlxclb2fp0vcpoufmo8af7df0ybgkz5xg5q&rid=200w.gif',
                    alt: 'cats omg GIF',
                    imageHeight: 167,
                    imageWidth: 200,
                },
                {
                    url:
                        'https://media0.giphy.com/media/kqP63EDhUdLmU/200w.gif?cid=0dab75cc6qc9cwlxclb2fp0vcpoufmo8af7df0ybgkz5xg5q&rid=200w.gif',
                    alt: 'the simpsons television GIF',
                    imageHeight: 150,
                    imageWidth: 200,
                },
                {
                    url:
                        'https://media1.giphy.com/media/GvMSpPx44XlFm/200w.gif?cid=0dab75cc6qc9cwlxclb2fp0vcpoufmo8af7df0ybgkz5xg5q&rid=200w.gif',
                    alt: 'sleepy cat GIF',
                    imageHeight: 116,
                    imageWidth: 200,
                },
            ],
            isLoading: false,
            isLastSearchError: false,
            isNewSearchPending: false,
            totalResultsCount: 5,
        },
    }

    const store = getStore(mockState)
    return imagePanelStoryTemplate(store)
}

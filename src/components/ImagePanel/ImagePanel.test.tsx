import React from 'react'
import { AppState, initialAppState } from 'store/root-reducer'
import { initialImageSearchState } from 'store/image-search-slice'
import { withStore } from 'store/with-store'
import { render } from '@testing-library/react'
import { getStore } from 'store/configure-store'
import { ImagePanel } from './ImagePanel'
import { setupIntersectionObserverMock } from 'test-helpers/mock-intersection-observer'

describe('Image Panel', () => {
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
    beforeAll(() => {
        setupIntersectionObserverMock()
    })
    it('displays the correct status message for loading', () => {
        const store = getImageSearchStateStore({ isLoading: true })
        const view = render(withStore(store, <ImagePanel />))
        expect(view.getByText(/Loading/)).toBeInTheDocument()
    })
    it('displays the correct status message when a search error occurs', () => {
        const store = getImageSearchStateStore({
            isLoading: false,
            isLastSearchError: true,
        })
        const view = render(withStore(store, <ImagePanel />))
        expect(view.getByText(/Search Error/)).toBeInTheDocument()
    })
    it('displays the correct status message when no search has been entered yet', () => {
        const store = getImageSearchStateStore({})
        const view = render(withStore(store, <ImagePanel />))
        expect(
            view.getByText(/Patiently awaiting an image search/)
        ).toBeInTheDocument()
    })
    it('displays the correct status message when no search results were found', () => {
        const store = getImageSearchStateStore({
            searchText: 'test',
            areResultsRemaining: false,
            images: [],
        })
        const view = render(withStore(store, <ImagePanel />))
        expect(view.getByText('No images found')).toBeInTheDocument()
    })
    it('displays the correct status message no search results are remaining', () => {
        const store = getImageSearchStateStore({
            searchText: 'test',
            areResultsRemaining: false,
            images: ['test1', 'test2'],
        })
        const view = render(withStore(store, <ImagePanel />))
        expect(view.getByText("That's all of them!")).toBeInTheDocument()
    })
    //TODO: Test loading on scroll, jsdom does not allow for intersection observer
    // Recommend using Cypress/Selenium/Puppeteer instead
})

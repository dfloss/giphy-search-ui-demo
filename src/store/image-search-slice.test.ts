import { getStore } from './configure-store'
import {
    initialImageSearchState,
    loadMoreImages,
    submitSearch,
} from './image-search-slice'
import { setGiphySearchMock } from 'services/giphy/mocks/set-giphy-search-mock'
import giphySearch4Results from 'services/giphy/mocks/giphy-search-4-results.json'
import giphySearchMoreResults from 'services/giphy/mocks/giphy-search-20-results.json'
import giphySearchNoResults from 'services/giphy/mocks/giphy-search-no-results.json'

describe('Image Search Redux State', () => {
    const giphyExpected4 = [
        {
            url:
                'https://media0.giphy.com/media/bFvJkz0GyIi76/200w.gif?cid=0dab75ccz2uuearjpvsd9rbh3foz4qqk7okr320huywfhvfu&rid=200w.gif',
            alt: 'petting zoo spit GIF by Cheezburger',
            imageHeight: 112,
            imageWidth: 200,
        },
        {
            url:
                'https://media4.giphy.com/media/l2YWErhGkiqIYHqWA/200w.gif?cid=0dab75ccz2uuearjpvsd9rbh3foz4qqk7okr320huywfhvfu&rid=200w.gif',
            alt: 'season 2 episode 6 GIF by Twin Peaks on Showtime',
            imageHeight: 132,
            imageWidth: 200,
        },
        {
            url:
                'https://media1.giphy.com/media/l2YWFaTbEGTtMuo1O/200w.gif?cid=0dab75ccz2uuearjpvsd9rbh3foz4qqk7okr320huywfhvfu&rid=200w.gif',
            alt: 'season 2 episode 6 GIF by Twin Peaks on Showtime',
            imageHeight: 132,
            imageWidth: 200,
        },
        {
            url:
                'https://media2.giphy.com/media/l2YWiNCw0rjXUnNPW/200w.gif?cid=0dab75ccz2uuearjpvsd9rbh3foz4qqk7okr320huywfhvfu&rid=200w.gif',
            alt: 'season 2 episode 6 GIF by Twin Peaks on Showtime',
            imageHeight: 132,
            imageWidth: 200,
        },
    ]
    describe('submitSearch', () => {
        it('sets the search text, images, and remaining results when search is successful with no additional results', async () => {
            setGiphySearchMock(giphySearch4Results, 200, 'test', 0)
            const store = getStore()
            await store.dispatch(submitSearch('test'))
            const result = store.getState().imageSearch
            expect(result.searchText).toBe('test')
            expect(result.isLastSearchError).toBe(false)
            expect(result.images).toEqual(giphyExpected4)
            expect(result.totalResultsCount).toBe(4)
        })
        it('sets remaining results to true when a search returns with additional results', async () => {
            setGiphySearchMock(giphySearchMoreResults)
            const store = getStore()
            await store.dispatch(submitSearch('test'))
            const result = store.getState().imageSearch
            expect(result.totalResultsCount).toBe(8444)
        })
        it('sets remaining results to false when a search returns with no results', async () => {
            setGiphySearchMock(giphySearchNoResults)
            const store = getStore()
            await store.dispatch(submitSearch('test'))
            const result = store.getState().imageSearch
            expect(result.totalResultsCount).toBe(0)
        })
        it('sets error state when giphy service fails', async () => {
            setGiphySearchMock(null, 500)
            const store = getStore()
            await store.dispatch(submitSearch('test'))
            const result = store.getState().imageSearch
            expect(result.isLastSearchError).toBe(true)
            expect(result.totalResultsCount).toBe(0)
        })
    })
    describe('loadAdditionalImages', () => {
        it('searches for images with the correct query and offset, appends them to images state, and sets areResultsRemaining when no more images are present', async () => {
            // Expect an offset of 1 since we've already got a single image loaded
            setGiphySearchMock(giphySearch4Results, 200, 'loadMoreImages', 1)
            const store = getStore({
                imageSearch: {
                    ...initialImageSearchState,
                    images: [
                        {
                            url: 'test',
                            alt: 'a fictional test image',
                            imageHeight: 0,
                            imageWidth: 0,
                        },
                    ],
                    searchText: 'loadMoreImages',
                },
            })
            await store.dispatch(loadMoreImages())
            const result = store.getState().imageSearch
            expect(result.isLastSearchError).toBe(false)
            expect(result.images).toEqual([
                {
                    url: 'test',
                    alt: 'a fictional test image',
                    imageHeight: 0,
                    imageWidth: 0,
                },
                ...giphyExpected4,
            ])
            expect(result.totalResultsCount).toBe(4)
        })
        it('sets areResultsRemaining to true when results when the search contains more results', async () => {
            setGiphySearchMock(giphySearchMoreResults, 200, 'loadMoreImages', 1)
            const store = getStore({
                imageSearch: {
                    ...initialImageSearchState,
                    images: [
                        {
                            url: 'test',
                            alt: 'a fictional test image',
                            imageHeight: 0,
                            imageWidth: 0,
                        },
                    ],
                    searchText: 'loadMoreImages',
                },
            })
            await store.dispatch(loadMoreImages())
            const result = store.getState().imageSearch
            expect(result.isLastSearchError).toBe(false)
            expect(result.totalResultsCount).toBe(8444)
        })
        it('sets remaining results to false when a search returns with no results', async () => {
            setGiphySearchMock(giphySearchNoResults)
            const store = getStore({
                imageSearch: {
                    ...initialImageSearchState,
                    images: [
                        {
                            url: 'test',
                            alt: 'a fictional test image',
                            imageHeight: 0,
                            imageWidth: 0,
                        },
                    ],
                    searchText: 'loadMoreImages',
                },
            })
            await store.dispatch(loadMoreImages())
            const result = store.getState().imageSearch
            expect(result.totalResultsCount).toBe(0)
        })
        it('sets error state when giphy service fails', async () => {
            setGiphySearchMock(null, 500)
            const store = getStore({
                imageSearch: {
                    ...initialImageSearchState,
                    images: [
                        {
                            url: 'test',
                            alt: 'a fictional test image',
                            imageHeight: 0,
                            imageWidth: 0,
                        },
                    ],
                    searchText: 'loadMoreImages',
                },
            })
            await store.dispatch(loadMoreImages())
            const result = store.getState().imageSearch
            expect(result.isLastSearchError).toBe(true)
            expect(result.totalResultsCount).toBe(0)
        })
    })
})

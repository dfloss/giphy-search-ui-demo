import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { searchGiphyGifs } from 'services/giphy/giphy-service'
import { GiphyImageSearchResponse } from 'services/giphy/giphy-types'
import { AppDispatch } from './configure-store'
import { AppState } from './root-reducer'

interface ImageData {
    url: string
    alt: string
    imageHeight: number
    imageWidth: number
}
interface ImageSearchState {
    searchText: string
    images: ImageData[]
    isLoading: boolean
    isLastSearchError: boolean
    areResultsRemaining: boolean | null
}

export const initialImageSearchState: ImageSearchState = {
    searchText: '',
    images: [],
    isLoading: false,
    isLastSearchError: false,
    areResultsRemaining: null,
}

export const submitSearch = createAsyncThunk(
    'imageSearch/submitSearch',
    async (searchText: string, thunkAPI) => {
        const response = await searchGiphyGifs(searchText)
        return response.data
    }
)

export const loadMoreImages = createAsyncThunk<
    GiphyImageSearchResponse,
    void,
    { dispatch: AppDispatch; state: AppState }
>('imageSearch/loadMoreImages', async (_, thunkApi) => {
    const {
        searchText,
        images: { length: imageCount },
    } = thunkApi.getState().imageSearch
    const response = await searchGiphyGifs(searchText, imageCount)
    return response.data
})

/**
 * Returns a list of image urls based on a giphy image search response
 * Currently set to return the fixed_height format
 * @param giphyResponse response from the giphy search request
 */
const getImages = (giphyResponse: GiphyImageSearchResponse) =>
    giphyResponse.data.map((imageResult) => ({
        url: imageResult.images.fixed_width.url,
        alt: imageResult.title,
        imageHeight: Number(imageResult.images.fixed_width.height),
        imageWidth: Number(imageResult.images.fixed_width.width),
    }))

/**
 * Returns true of false depending on if there are still additional search results
 * Based on the response from the giphy search endpoint
 * @param giphyResponse response from giphy search request
 */
const getAreResultsRemaining = (giphyResponse: GiphyImageSearchResponse) => {
    // if the total number of images loaded (offset + count) is less than the total count
    // there should more results
    return (
        giphyResponse.pagination.offset + giphyResponse.pagination.count <
        giphyResponse.pagination.total_count
    )
}

const imageSearchSlice = createSlice({
    name: 'imageSearch',
    initialState: initialImageSearchState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(submitSearch.pending, (state, action) => {
            state.searchText = action.meta.arg
            state.isLoading = true
        })
        builder.addCase(submitSearch.fulfilled, (state, action) => {
            //Grab the fixed height url to display in the list
            state.images = getImages(action.payload)
            state.areResultsRemaining = getAreResultsRemaining(action.payload)
            state.isLoading = false
            state.isLastSearchError = false
        })
        builder.addCase(submitSearch.rejected, (state, action) => {
            state.isLoading = false
            state.areResultsRemaining = false
            state.isLastSearchError = true
        })
        builder.addCase(loadMoreImages.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(loadMoreImages.fulfilled, (state, action) => {
            state.images = state.images.concat(getImages(action.payload))
            state.areResultsRemaining = getAreResultsRemaining(action.payload)
            state.isLoading = false
            state.isLastSearchError = false
        })
        builder.addCase(loadMoreImages.rejected, (state) => {
            state.isLastSearchError = true
            state.areResultsRemaining = false
            state.isLoading = true
        })
    },
})

export const { reducer: imageSearchReducer } = imageSearchSlice

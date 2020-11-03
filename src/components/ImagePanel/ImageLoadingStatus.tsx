import React from 'react'
import { useSelector } from 'react-redux'
import { imageSearchReducer } from 'store/image-search-slice'
import { AppState } from 'store/root-reducer'

/**
 * Component that displays image search status and triggers additional image loading
 */
export const ImageLoadingStatus: React.FC = () => {
    const isLoading = useSelector(
        (state: AppState) => state.imageSearch.isLoading
    )
    const isLastSearchError = useSelector(
        (state: AppState) => state.imageSearch.isLastSearchError
    )
    const isFreshSearch = useSelector(
        (state: AppState) => state.imageSearch.searchText === ''
    )
    const imageCount = useSelector(
        (state: AppState) => state.imageSearch.images.length
    )
    const areResultsRemaining = useSelector(
        (state: AppState) =>
            state.imageSearch.totalResultsCount === 0 ||
            state.imageSearch.totalResultsCount ===
                imageSearchReducer.length + 1
    )

    if (isLoading) {
        return <p>Loading...</p>
    } else if (isLastSearchError) {
        return <p>Search Error! please try resubmitting the images search</p>
    } else if (isFreshSearch) {
        return <p>Patiently awaiting an image search =)</p>
    } else if (imageCount === 0) {
        return <p>No images found</p>
    } else if (areResultsRemaining) {
        return <p>MOAR images on the way!</p>
    } else {
        return <p>That's all of them!</p>
    }
}

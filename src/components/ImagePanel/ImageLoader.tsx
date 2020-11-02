import { useIntersect } from 'hooks/useIntersect'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadMoreImages } from 'store/image-search-slice'
import { AppState } from 'store/root-reducer'

/**
 * Component that displays image search status and triggers additional image loading
 */
export const ImageLoader: React.FC = () => {
    const areResultsRemaining = useSelector(
        (state: AppState) => state.imageSearch.areResultsRemaining
    )
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
    const [ref, entry] = useIntersect<HTMLDivElement>({ root: null })
    const dispatch = useDispatch()

    useEffect(() => {
        if (entry?.isIntersecting === true) {
            console.log('loading more images')
            dispatch(loadMoreImages())
        }
    }, [entry, dispatch])

    if (isLoading) {
        return <p>Loading...</p>
    } else if (isLastSearchError) {
        return <p>Search Error! please try resubmitting the images search</p>
    } else if (isFreshSearch) {
        return <p>Patiently awaiting an image search =)</p>
    } else if (areResultsRemaining) {
        //TODO: handle ref triggering loading more images
        return <p ref={ref}>MOAR images on the way!</p>
    } else if (imageCount === 0) {
        return <p>No images found</p>
    } else {
        return <p>That's all of them!</p>
    }
}

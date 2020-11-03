import { Masonry, useInfiniteLoader } from 'masonic'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadMoreImages } from 'store/image-search-slice'
import { AppState } from 'store/root-reducer'
import { ImageLoadingStatus } from './ImageLoadingStatus'
import './ImagePanel.css'

// set the image panel column width, should be based on width of searched images
const columnWidth = 200
// size of gutter between images
const columnGutter = 8
interface FoundImageProps {
    url: string
    alt: string
}
const FoundImage = ({ data: { url, alt } }: { data: FoundImageProps }) => {
    return <img src={url} alt={alt} key={url} />
}

export const ImagePanel: React.FC = () => {
    const images = useSelector((state: AppState) => state.imageSearch.images)
    const searchText = useSelector(
        (state: AppState) => state.imageSearch.searchText
    )
    const isNewSearchPending = useSelector(
        (state: AppState) => state.imageSearch.isNewSearchPending
    )

    const totalResultsCount = useSelector(
        (state: AppState) => state.imageSearch.totalResultsCount
    )
    const isLoading = useSelector<AppState>(
        (state) => state.imageSearch.isLoading
    )
    const dispatch = useDispatch()
    const loadImages = () => {
        return !isLoading ? dispatch(loadMoreImages()) : undefined
    }
    const imageLoader = useInfiniteLoader(loadImages, {
        totalItems: totalResultsCount,
        minimumBatchSize: 20,
        threshold: 3,
    })
    return (
        <div id="image-panel">
            {/* 
            Do not render images when a new search has been submitted 
            This is done to prevent errors related to mutating "images" when a new search is submitted
            */}
            {!isNewSearchPending && (
                <Masonry
                    key={searchText}
                    items={images}
                    columnWidth={columnWidth}
                    columnGutter={columnGutter}
                    overscanBy={1}
                    render={FoundImage}
                    onRender={imageLoader}
                />
            )}
            <ImageLoadingStatus />
        </div>
    )
}

import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'store/root-reducer'
import { ImageLoader } from './ImageLoader'
import './ImagePanel.css'

/**
 * Component that displays image search status and triggers additional image loading
 */
export const ImagePanel: React.FC = () => {
    const images = useSelector((state: AppState) => state.imageSearch.images)

    return (
        <div id="image-panel">
            {images.map(({ url, alt }, index) => {
                return (
                    <div key={index}>
                        <img src={url} alt={alt} />
                    </div>
                )
            })}
            <ImageLoader />
        </div>
    )
}

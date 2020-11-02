import axios from 'axios'
import { GiphyImageSearchResponse } from './giphy-types'

const apiKey = process.env.REACT_APP_GIPHY_API_KEY
export const giphyService = axios.create({
    baseURL: 'https://api.giphy.com/v1',
})
giphyService.defaults.params = { api_key: apiKey }

export const searchGiphyGifs = (
    search: string,
    offset?: number,
    limit = 20
) => {
    return giphyService.request<GiphyImageSearchResponse>({
        url: '/gifs/search',
        params: {
            q: search,
            limit,
            offset,
        },
    })
}

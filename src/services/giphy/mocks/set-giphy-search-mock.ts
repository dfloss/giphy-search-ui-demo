import AxiosMockAdapter from 'axios-mock-adapter'
import { giphyService } from 'services/giphy/giphy-service'

/**
 * mocks the GiphySearch API to return a specific response
 * @param response mock response that will be returned when called
 * @param statusCode status code of mock response
 * @param query expected search query param, if specified result will only be returned if the request has the same search query param
 * @param offset expected offset, if specified result will only be returned if the request has the same offset param
 */
export const setGiphySearchMock = (
    response: any,
    statusCode = 200,
    query?: string,
    offset?: number
) => {
    const httpMock = new AxiosMockAdapter(giphyService)
    if (query) {
        httpMock.onGet(/gifs\/search/).reply((request) => {
            const { params } = request
            // if query and/or offset are specified validate that they match, if not specified return result
            if (
                (!query || query === params.q) &&
                (!offset || offset === params.offset)
            ) {
                return [statusCode, response]
            } else {
                const message = `request with${query ? ` q=${params.q}` : ''}${
                    offset ? ` offset=${params.offset}` : ''
                } did not match expected${query ? ` q=${query}` : ''}${
                    offset ? ` offset=${offset}` : ''
                }`
                console.error(message)
                return [418, message]
            }
        })
        // httpMock.onGet(/gifs\/search/)
    } else {
        httpMock.onGet(/gifs\/search/).reply(statusCode, response)
    }
    return httpMock
}

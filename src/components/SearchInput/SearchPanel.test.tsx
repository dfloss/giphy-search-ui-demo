import { searchPanel } from './SearchPanel.stories'
import { fireEvent, render } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import { AppState } from 'store/root-reducer'
import { getDefaultMiddleware } from '@reduxjs/toolkit'
import { setGiphySearchMock } from 'services/giphy/mocks/set-giphy-search-mock'
import giphySearch4Results from 'services/giphy/mocks/giphy-search-4-results.json'

describe('Search Panel', () => {
    it('disables the submit button when no search is entered', () => {
        const store = configureStore<AppState>(getDefaultMiddleware())()
        const view = render(searchPanel({ store }))
        const submitButton = view.getByRole('button')
        expect(submitButton).toHaveAttribute('disabled')
    })
    it('submits search with correct search text when submit is pressed', () => {
        setGiphySearchMock(giphySearch4Results)

        const store = configureStore<AppState>(getDefaultMiddleware())()
        const view = render(searchPanel({ store }))
        const input = view.getByLabelText('Search:')
        const submitButton = view.getByText('Submit')
        fireEvent.change(input, { target: { value: 'test' } })
        fireEvent.click(submitButton)

        const initialAction = store.getActions()[0]
        expect(initialAction.type).toEqual('imageSearch/submitSearch/pending')
        expect(initialAction.meta.arg).toEqual('test')
    })
    it('submits search with correct search text when enter key is pressed', () => {
        setGiphySearchMock(giphySearch4Results)

        const store = configureStore<AppState>(getDefaultMiddleware())()
        const view = render(searchPanel({ store }))
        const input = view.getByLabelText('Search:')
        fireEvent.change(input, { target: { value: 'test' } })
        fireEvent.keyDown(input, { key: 'Enter' })

        const initialAction = store.getActions()[0]
        expect(initialAction.type).toEqual('imageSearch/submitSearch/pending')
        expect(initialAction.meta.arg).toEqual('test')
    })
})

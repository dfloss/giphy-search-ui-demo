import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import { setupIntersectionObserverMock } from 'test-helpers/mock-intersection-observer'

describe('App', () => {
    beforeAll(() => {
        setupIntersectionObserverMock()
    })
    test('renders search field', () => {
        render(<App />)
        const searchLabel = screen.getByText(/Search:/i)
        expect(searchLabel).toBeInTheDocument()
    })
})

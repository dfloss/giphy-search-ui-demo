import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { submitSearch } from 'store/image-search-slice'
import './SearchPanel.css'

export const SearchPanel: React.FC = () => {
    const [searchText, setSearchText] = useState<string>('')
    const dispatch = useDispatch()
    const dispatchSearch = () => dispatch(submitSearch(searchText))
    return (
        <div className="search-input-panel">
            <input
                placeholder={'find a gif!'}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) =>
                    e.key === 'Enter' ? dispatchSearch() : undefined
                }
            />

            <button
                onClick={dispatchSearch}
                disabled={searchText === ''}
                className="submit-button"
            >
                Submit
            </button>
        </div>
    )
}

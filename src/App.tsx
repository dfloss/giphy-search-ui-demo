import React from 'react'
import 'mini.css'
import { SearchPanel } from 'components/SearchInput/SearchPanel'
import { Provider } from 'react-redux'
import store from 'store/configure-store'
import { ImagePanel } from 'components/ImagePanel/ImagePanel'
import './App.css'
function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <SearchPanel />
                <div className="image-panel-container">
                    <ImagePanel />
                </div>
            </div>
        </Provider>
    )
}

export default App

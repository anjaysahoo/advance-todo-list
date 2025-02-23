import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import { initializeStore } from './store/store'

const init = async () => {
    const store = await initializeStore()
    
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    )
}

init()

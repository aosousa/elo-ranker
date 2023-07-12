import React from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { store } from './app/store'
import { BrowserRouter } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

// Features
import { setAuthData } from './features/auth/authSlice'
import { fetchRankings } from './features/rankings/rankingsSlice'

// Utils
import { CookieUtils } from './utils/cookieUtils'

const start = async () => {
    const container = document.getElementById('root')
    const root = createRoot(container)

    library.add(faTrash)

    const sessionCookie = CookieUtils.getCookie('elo-ranker_session')
    if (sessionCookie) {
        store.dispatch(setAuthData(sessionCookie))
    }

    store.dispatch(fetchRankings())

    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter basename='/elo-ranker'>
                    <App />
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    )
}

start()
import React from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { store } from './app/store'
import { BrowserRouter } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMoon, faTrash, faSun } from '@fortawesome/free-solid-svg-icons'

// Features
import { setAuthData } from './features/auth/authSlice'
import { fetchRankings } from './features/rankings/rankingsSlice'

// Utils
import CookieUtils from './utils/cookieUtils'

const start = async () => {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  const container = document.getElementById('root')!
  const root = createRoot(container)

  library.add(faMoon, faTrash, faSun)

  const sessionCookie = CookieUtils.getCookie('elo-ranker_session')
  if (sessionCookie) {
    store.dispatch(setAuthData(sessionCookie))
  }

  store.dispatch(fetchRankings())

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter basename="/elo-ranker">
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  )
}

start()

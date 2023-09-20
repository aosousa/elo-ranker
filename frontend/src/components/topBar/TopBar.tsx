// Core
import React, { Suspense, lazy, useEffect, useState } from 'react'
import './TopBar.css'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, store } from '../../app/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Components
import Loading from '../loading/Loading'

// Features
import { login, logout } from '../../features/auth/authSlice'

const Modal = lazy(() => import('../modal/Modal'))

export const TopBar = () => {
  const [theme, setTheme] = useState('theme' in localStorage ? localStorage.theme : 'dark')
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch<AppDispatch>()
  const authData = useSelector(() => store.getState().auth.data)
  const authStatus = useSelector(() => store.getState().auth.status)

  const [hoverStatus, setHoverStatus] = useState(false)

  const onUsernameChanged = (e: React.FormEvent<HTMLInputElement>) => setUsername((e.target as HTMLInputElement).value)
  const onPasswordChanged = (e: React.FormEvent<HTMLInputElement>) => setPassword((e.target as HTMLInputElement).value)
  const onLoginButtonClicked = async () => {
    try {
      setLoginError(false)
      await dispatch(
        login({
          username,
          password
        })
      )
    } catch (error) {
      setLoginError(true)
      console.error(`Failed to login: ${error}`)
    }
  }

  const onLogoutButtonClicked = async () => store.dispatch(logout())

  useEffect(() => {
    if (authStatus === 'failed') {
      setLoginError(true)
    } else {
      setLoginError(false)

      if (authStatus === 'succeeded') {
        setLoginModalIsOpen(false)
      }
    }
  }, [authStatus])

  const changeTheme = (theme: string) => {
    setTheme(theme)
    localStorage.setItem('theme', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <div className="top-bar">
      <div className="top-bar__logo-div" onMouseEnter={() => setHoverStatus(true)} onMouseLeave={() => setHoverStatus(false)}>
        {!hoverStatus && <div className="top-bar__logo-div-title">ELO Ranker</div>}
        {hoverStatus && (
          <div className="top-bar__logo-div-easter-egg">
            <div className="text-sm">&quot;I need the algorithm.&quot;</div>
            <div className="italic text-xs">The Social Network (2010)</div>
          </div>
        )}
      </div>

      <div className="flex flex-shrink-0 ml-2">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
          Rankings
        </NavLink>
      </div>

      <div className="flex flex-shrink-0 ml-auto mr-2">
        {theme === 'dark' ? (
          <FontAwesomeIcon title="Light Mode" className="text-white mt-2 mr-4 w-5 h-5 cursor-pointer" icon="sun" onClick={() => changeTheme('light')} />
        ) : (
          <FontAwesomeIcon title="Dark Mode" className="text-zinc-800 mt-2 mr-4 w-5 h-5 cursor-pointer" icon="moon" onClick={() => changeTheme('dark')} />
        )}

        {authData === '' && (
          <button
            className="bg-green-600 hover:bg-green-700 focus:bg-green-700 font-semibold text-white rounded-md hover:shadow-md focus:shadow-md outline-none px-4 py-1.5"
            onClick={() => setLoginModalIsOpen(true)}
          >
            Edit Mode
          </button>
        )}
        {authData !== '' && (
          <button
            className="bg-gray-600 hover:bg-gray-700 focus:bg-gray-700 font-semibold text-white rounded-md hover:shadow-md focus:shadow-md outline-none px-4 py-1.5"
            onClick={onLogoutButtonClicked}
          >
            View Mode
          </button>
        )}
      </div>

      {loginModalIsOpen && (
        <Suspense fallback={<Loading />}>
          <Modal title="Login" closeModal={() => setLoginModalIsOpen(false)}>
            <form className="flex flex-col mx-auto">
              <div className="flex flex-col">
                <label htmlFor="username" className="font-semibold">
                  Username
                </label>
                <input id="username" type="text" placeholder="Username" className="elo-ranker-input" onChange={onUsernameChanged} />
              </div>

              <div className="flex flex-col mt-2">
                <label htmlFor="password" className="font-semibold">
                  Password
                </label>
                <input id="password" type="password" placeholder="Password" className="elo-ranker-input" onChange={onPasswordChanged} />
              </div>

              <button
                className="flex justify-center items-center bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 hover:shadow-md text-white font-bold rounded-md disabled:pointer-events-none select-none p-1 mt-4"
                disabled={authStatus === 'loading' || username === '' || password === ''}
                onClick={onLoginButtonClicked}
              >
                Login
              </button>

              {loginError && <div className="mt-1 text-center text-xs text-red-700">Failed to authenticate user.</div>}
            </form>
          </Modal>
        </Suspense>
      )}
    </div>
  )
}

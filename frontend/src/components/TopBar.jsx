// Core
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { store } from '../app/store'

// Components
import Modal from './Modal'

// Features
import { login, logout } from '../features/auth/authSlice'

export const TopBar = () => {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const authData = useSelector(() => store.getState().auth.data)
  const authStatus = useSelector(() => store.getState().auth.status)

  const onUsernameChanged = (e) => setUsername(e.target.value)
  const onPasswordChanged = (e) => setPassword(e.target.value)
  const onLoginButtonClicked = () => {
    try {
      setLoginError(false)
      dispatch(
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

  const onLogoutButtonClicked = async () => {
    store.dispatch(logout())
  }

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

  return (
    <div className="h-12 flex flex-row items-center bg-white shadow-sm border-b">
      <div className="flex font-semibold flex-shrink-0 ml-4 pr-4 border-r">
        <div className="bg-white text-blue-600 text-2xl font-semibold p-1.5">ELO Ranker</div>
      </div>

      <div className="flex flex-shrink-0 ml-2">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
          Rankings
        </NavLink>
      </div>

      <div className="flex flex-shrink-0 ml-auto mr-2">
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
              disabled={authStatus === 'loading'}
              onClick={onLoginButtonClicked}
            >
              Login
            </button>

            {loginError && <div className="mt-1 text-center text-xs text-red-700">Failed to authenticate user.</div>}
          </form>
        </Modal>
      )}
    </div>
  )
}

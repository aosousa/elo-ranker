// Components
import './App.css'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Components
import { TopBar } from './components/TopBar'

// Features
import { Rankings } from './features/rankings/Rankings'

function App() {
  return (
    <div className="App">
      <TopBar />

      <Routes>
        <Route path="/" element={<Rankings />} />
      </Routes>
    </div>
  )
}

export default App

// Components
import './App.css'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Components
import { TopBar } from './components/TopBar'

// Features
import { Ranking } from './features/rankings/Ranking'
import { Rankings } from './features/rankings/Rankings'

function App() {
  return (
    <div className="App">
      <TopBar />

      <Routes>
        <Route path="/" element={<Rankings />} />
        <Route path="/rankings/:id" element={<Ranking />} />
      </Routes>
    </div>
  )
}

export default App

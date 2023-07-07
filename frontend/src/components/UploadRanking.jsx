// Core
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

// Features
import { createRanking } from '../features/rankings/rankingsSlice'

export const UploadRanking = () => {
  const [name, setName] = useState('')
  const handleNameChange = (e) => setName(e.target.value)

  const [file, setFile] = useState(null)
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const dispatch = useDispatch()

  const handleUploadClick = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('ranking', file)

    dispatch(createRanking(formData))
  }

  return (
    <div className="grid">
      <label className="font-semibold" htmlFor="name">
        Name
      </label>
      <input type="text" id="name" className="elo-ranker-input" placeholder="Name" onChange={handleNameChange} />

      <input type="file" className="elo-ranker-input mt-2" onChange={handleFileChange} />

      <div>{file && `${file.name}`}</div>

      <button className="font-semibold bg-blue-500 hover:bg-blue-700 text-white mt-2 p-2 rounded-md" onClick={handleUploadClick}>
        Upload
      </button>
    </div>
  )
}

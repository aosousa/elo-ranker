// Core
import React, { useState } from 'react'
import './UploadRanking.css'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../app/store'

// Features
import { createRanking } from '../../features/rankings/rankingsSlice'

export const UploadRanking = () => {
  const rankingsSliceStatus = useSelector(() => store.getState().rankings.status)

  const [submitError, setSubmitError] = useState(false)

  const [name, setName] = useState('')
  const handleNameChange = (e) => setName(e.target.value)

  const [file, setFile] = useState(null)
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const canSave = [name, file].every(Boolean)

  const dispatch = useDispatch()

  const handleUploadClick = () => {
    try {
      setSubmitError(false)

      const formData = new FormData()
      formData.append('name', name)
      formData.append('ranking', file)

      dispatch(createRanking(formData))
    } catch (error) {
      setSubmitError(true)
      console.error(`Failed to upload ranking: ${error}`)
    } finally {
      if (rankingsSliceStatus === 'succeeded') {
        document.getElementById('name').value = ''
        document.getElementById('ranking-file').value = ''
      }
    }
  }

  return (
    <div className="grid">
      <div className="upload-ranking-json-message">File has to be in JSON format with the following structure:</div>
      <code className="upload-ranking-json-code">
        id: number,
        <br />
        name: string,
        <br />
        imageSrc: string,
        <br />
        rating: 1400
      </code>
      <label className="upload-ranking-label" htmlFor="name">
        Name
      </label>
      <input type="text" id="name" className="elo-ranker-input" placeholder="Name" onChange={handleNameChange} />
      <input type="file" id="ranking-file" className="elo-ranker-input mt-2" onChange={handleFileChange} />
      <button disabled={!canSave} className="upload-ranking-btn" onClick={handleUploadClick}>
        Create Ranking
      </button>
      {submitError && <div className="text-xs text-red-700 mt-1 mr-2">An error occurred while uploading the ranking.</div>}
    </div>
  )
}
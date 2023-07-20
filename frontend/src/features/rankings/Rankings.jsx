// Core
import React from 'react'
import './Rankings.css'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { store } from '../../app/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Components
import { UploadRanking } from '../../components/uploadRanking/UploadRanking'

// Features
import { selectAllRankings, deleteRanking } from './rankingsSlice'

export const Rankings = () => {
  const dispatch = useDispatch()
  const auth = useSelector(() => store.getState().auth.data)

  const rankings = useSelector(selectAllRankings)

  const onDeleteRankingButtonClicked = (id) => {
    dispatch(deleteRanking(id))
  }

  const rankingsList = rankings.map((ranking) => (
    <div className="flex flex-row" key={ranking.id}>
      <NavLink key={ranking.id} to={`/rankings/${ranking.id}`}>
        <div className="ranking-list-item">{ranking.name}</div>
      </NavLink>
      {auth !== '' && (
        <button type="button" title="Delete Ranking" className="rankings__delete-ranking-btn" onClick={() => onDeleteRankingButtonClicked(ranking.id)}>
          <FontAwesomeIcon icon="trash" />
        </button>
      )}
    </div>
  ))

  return (
    <div className="rankings">
      <div className="rankings__title">Rankings</div>
      <div className="mt-2 px-2">{rankingsList}</div>
      {auth !== '' && (
        <div className="rankings__create-ranking">
          <div className="rankings__create-ranking-title">Create New Ranking</div>
          <UploadRanking />
        </div>
      )}
    </div>
  )
}

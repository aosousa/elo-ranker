// Core
import React from 'react'
import './Rankings.css'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { AppDispatch, store } from '../../app/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Components
import { UploadRanking } from '../../components/uploadRanking/UploadRanking'

// Features
import { selectAllRankings, deleteRanking } from './rankingsSlice'

export const Rankings = () => {
  const dispatch = useDispatch<AppDispatch>()
  const auth = useSelector(() => store.getState().auth.data)

  const rankings = useSelector(selectAllRankings)

  const onDeleteRankingButtonClicked = (id: number) => dispatch(deleteRanking(id))

  const rankingsList = rankings.map((ranking) => (
    <div className="flex flex-row" key={ranking.id}>
      <NavLink key={ranking.id} to={`/rankings/${ranking.id}`}>
        <p className="ranking-list-item">{ranking.name}</p>
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
      {rankings.length === 0 && <p className="rankings__no-rankings-msg">No rankings created yet!</p>}
      <div className="grid sm:grid-cols-1 md:grid-cols-2">
        <div className="rankings__create-ranking">
          <div className="rankings__create-ranking-title">Create New Ranking</div>
          <UploadRanking />
        </div>
        <div className="mt-2 px-2">{rankingsList}</div>
      </div>
    </div>
  )
}

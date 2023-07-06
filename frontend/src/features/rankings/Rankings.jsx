// Core
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

// Components
import { UploadRanking } from '../../components/UploadRanking'

// Features
import { fetchRankings, selectAllRankings } from './rankingsSlice'

export const Rankings = () => {
  const dispatch = useDispatch()
  const rankings = useSelector(selectAllRankings)
  const rankingsList = rankings.map((ranking) => (
    <NavLink key={ranking.id} to={`/rankings/${ranking.id}`}>
      <div className="my-2">{ranking.name}</div>
    </NavLink>
  ))

  useEffect(() => {
    dispatch(fetchRankings())
  })

  return (
    <div className="grid-container">
      <div>
        <div className="text-2xl font-bold mt-2">Rankings</div>
        <div className="border mt-2 px-2">{rankingsList}</div>
        <div className="mt-2">
          <div className="font-semibold">Create New Ranking</div>
          <UploadRanking />
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  )
}

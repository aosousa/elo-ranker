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
      <div className="bg-gray-200 font-semibold rounded-md p-2 my-2">{ranking.name}</div>
    </NavLink>
  ))

  useEffect(() => {
    dispatch(fetchRankings())
  }, [dispatch, fetchRankings])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-2xl font-bold mt-2">Rankings</div>
      <div className="mt-2 px-2">{rankingsList}</div>
      <div className="border border-gray-300 rounded-md p-4 mt-4">
        <div className="font-semibold text-lg">Create New Ranking</div>
        <UploadRanking />
      </div>
    </div>
  )
}

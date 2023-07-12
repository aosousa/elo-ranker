// Core
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { store } from '../../app/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Components
import { UploadRanking } from '../../components/UploadRanking'

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
        <div className="bg-gray-200 font-semibold rounded-md p-2 my-2">{ranking.name}</div>
      </NavLink>
      {auth !== '' && (
        <button
          type="button"
          title="Delete Ranking"
          className="w-8 h-8 rounded-md border-2 bg-transparent hover:bg-red-100 focus:bg-red-100 text-red-500 border-red-500 outline-none ml-2 mt-3 pb-0"
          onClick={() => onDeleteRankingButtonClicked(ranking.id)}
        >
          <FontAwesomeIcon icon="trash" />
        </button>
      )}
    </div>
  ))

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-2xl font-bold mt-2">Rankings</div>
      <div className="mt-2 px-2">{rankingsList}</div>
      {auth !== '' && (
        <div className="border border-gray-300 rounded-md p-4 mt-4">
          <div className="font-semibold text-lg">Create New Ranking</div>
          <UploadRanking />
        </div>
      )}
    </div>
  )
}

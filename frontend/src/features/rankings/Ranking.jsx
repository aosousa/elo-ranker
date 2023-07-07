// Core
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import './Ranking.css'

// Features
import { updateRanking, selectRankingById } from './rankingsSlice'

export const Ranking = () => {
  const params = useParams()
  const ranking = useSelector((state) => selectRankingById(state, String(params.id)))

  const loadPair = () => {}

  /**
   * Calculate new ELO for a given tiem
   * @param {object} a Item A
   * @param {object} b Item B
   */
  const elo = (a, b) => 1 / (1 + Math.pow(10, (b - a) / 400))

  /**
   * Sort items by their rating
   * @param {object} a Item A
   * @param {object} b Item B
   * @returns
   */
  const sortItemByRating = (a, b) => {
    if (a.rating < b.rating) {
      return 1
    }

    if (a.rating > b.rating) {
      return -1
    }

    return 0
  }

  const updateItemRanking = (a, b) => {}

  return <div className="grid-container"></div>
}

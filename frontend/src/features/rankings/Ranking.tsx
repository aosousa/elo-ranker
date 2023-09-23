// Core
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import './Ranking.css'
import { AppDispatch, store } from '../../app/store'

// Features
import { RankingItem } from './RankingItem'
import { updateRanking, selectRankingById } from './rankingsSlice'

// Types
import { RankingItem as TRankingItem } from '../../types/Ranking'

export const Ranking = () => {
  /**
   * lower value means the rating is changed by a smaller fraction
   * higher value means the changes in the rating will be more significant
   */
  const K = 30

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const params = useParams()

  const auth = useSelector(() => store.getState().auth.data)
  const ranking = useSelector((state) => selectRankingById(state, String(params.id)))
  const rankingSliceStatus = useSelector(() => store.getState().rankings.status)
  const items: TRankingItem[] = ranking ? JSON.parse(ranking.ranking) : []
  const top15Items = items.slice(0, 15)

  const rankingContent = (
    <ol className={auth !== '' ? 'ranking-ol-edit' : 'ranking-ol-view'}>
      {top15Items.map((item: TRankingItem) => (
        <li className="ml-8 dark:marker:text-white" key={item.id}>
          <div className="ranking-list">
            <div className="ranking-list__item-name">{item.name}</div>
            <div className={auth !== '' ? 'text-black dark:text-white' : 'text-black dark:text-white text-right mr-2'}>{item.rating.toFixed(2)}</div>
          </div>
        </li>
      ))}
    </ol>
  )

  const [leftItem, setLeftItem] = useState<TRankingItem | null>(null)
  const [rightItem, setRightItem] = useState<TRankingItem | null>(null)

  const loadPair = () => {
    const leftRandom = Math.floor(Math.random() * items.length)
    let rightRandom = Math.floor(Math.random() * items.length)

    // guarantee two different items
    while (rightRandom === leftRandom) {
      rightRandom = Math.floor(Math.random() * items.length)
    }

    setLeftItem(items[leftRandom])
    setRightItem(items[rightRandom])
  }

  /**
   * Calculate new ELO for a given item
   * @param {number} a Item A's rating
   * @param {number} b Item B's rating
   */
  const elo = (a: number, b: number) => 1 / (1 + Math.pow(10, (b - a) / 400))

  /**
   * Sort items by their rating
   * @param {RankingItem} a Item A
   * @param {RankingItem} b Item B
   * @returns
   */
  const sortItemByRating = (a: TRankingItem, b: TRankingItem) => {
    if (a.rating < b.rating) {
      return 1
    }

    if (a.rating > b.rating) {
      return -1
    }

    return 0
  }

  /**
   * Update an item's ELO rating
   * @param {RankingItem} a Item A
   * @param {RankingItem} b Item B
   */
  const updateItemRanking = (a: TRankingItem, b: TRankingItem) => {
    const Pa = elo(a.id, b.id)
    const Pb = elo(b.id, a.id)

    const Ra = a.rating + K * (1 - Pa)
    const Rb = a.rating + K * (0 - Pb)

    const leftItemInItems = items.find((item) => item.id === a.id)
    if (leftItemInItems) {
      leftItemInItems.rating = Ra
    }

    const rightItemInItems = items.find((item) => item.id === b.id)
    if (rightItemInItems) {
      rightItemInItems.rating = Rb
    }

    const sortedItems = items.sort(sortItemByRating)

    if (ranking) {
      dispatch(
        updateRanking({
          id: ranking.id,
          name: ranking.name,
          ranking: JSON.stringify(sortedItems)
        })
      )
    }
  }

  useEffect(() => {
    if (rankingSliceStatus === 'succeeded') {
      if (ranking === undefined) {
        navigate('/')
      } else {
        loadPair()
      }
    }
  }, [ranking, rankingSliceStatus])

  return (
    <>
      <div className="ranking__title">{ranking ? ranking.name : ''}</div>
      {auth !== '' && (
        <div className="grid-container">
          {leftItem && <RankingItem item={leftItem} vote={() => updateItemRanking(leftItem!, rightItem!)} />}
          {rightItem && <RankingItem item={rightItem} vote={() => updateItemRanking(rightItem!, leftItem!)} />}
          {rankingContent}
        </div>
      )}
      {auth === '' && rankingContent}
    </>
  )
}

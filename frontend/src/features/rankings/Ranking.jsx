// Core
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import './Ranking.css'
import { store } from '../../app/store'

// Features
import { RankingItem } from './RankingItem'
import { updateRanking, selectRankingById } from './rankingsSlice'

export const Ranking = () => {
  /**
   * lower value means the rating is changed by a smaller fraction
   * higher value means the changes in the rating will be more significant
   */
  const K = 30

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const auth = useSelector(() => store.getState().auth.data)
  const ranking = useSelector((state) => selectRankingById(state, String(params.id)))
  const rankingSliceStatus = useSelector(() => store.getState().rankings.status)
  const [items, setItems] = useState(ranking ? JSON.parse(ranking.ranking) : [])
  const [top25Items, setTop25Items] = useState(ranking ? items.slice(0, 25) : [])

  const rankingContent = (
    <ol className={auth !== '' ? 'list-decimal border-2 border-l-0 border-gray-500' : 'list-decimal border border-x-0 border-gray-500'}>
      {top25Items.map((item) => (
        <li className="ml-8" key={item.id}>
          <div className="ranking-list">
            <div className="font-semibold">{item.name}</div>
            <div className={auth !== '' ? '' : 'text-right mr-2'}>{item.rating.toFixed(2)}</div>
          </div>
        </li>
      ))}
    </ol>
  )

  const [leftItem, setLeftItem] = useState(null)
  const [rightItem, setRightItem] = useState(null)

  const loadPair = () => {
    const rankingItems = JSON.parse(ranking.ranking)
    console.log(rankingItems)
    setItems([...rankingItems])
    console.log(items)

    // console.log(items)
    // setTop25Items([...items.slice(0, 25)])
    // console.log(top25Items)

    const leftRandom = Math.floor(Math.random() * items.length)
    let rightRandom = Math.floor(Math.random() * items.length)

    console.log(leftRandom)
    console.log(rightRandom)

    // guarantee two different items
    while (rightRandom === leftRandom) {
      rightRandom = Math.floor(Math.random() * items.length)
    }

    setLeftItem(items[leftRandom])
    setRightItem(items[rightRandom])
  }

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

  /**
   * Update an item's ELO rating
   * @param {object} a Item A
   * @param {object} b Item B
   */
  const updateItemRanking = (a, b) => {
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

    dispatch(
      updateRanking({
        id: ranking.id,
        name: ranking.name,
        ranking: JSON.stringify(sortedItems)
      })
    )

    loadPair()
  }

  useEffect(() => {
    if (rankingSliceStatus === 'succeeded') {
      if (ranking === undefined) {
        navigate('/')
      } else {
        loadPair()
      }

      //   else {
      //     // console.log(ranking)
      //     // const rankingItems = JSON.parse(ranking.ranking)
      //     // console.log(rankingItems)

      //     setItems((prevState) => [...prevState, rankingItems])
      //     // console.log(items)
      //     // setTop25Items([...items.slice(0, 25)])
      //     // console.log(top25Items)
      //   }
    }
  }, [ranking, rankingSliceStatus])

  return (
    <>
      <div className="text-3xl font-bold text-center my-2">{ranking.name}</div>
      {auth !== '' && (
        <div className="grid-container">
          {leftItem && <RankingItem item={leftItem} vote={() => updateItemRanking(leftItem, rightItem)} />}
          {rightItem && <RankingItem item={rightItem} vote={() => updateItemRanking(rightItem, leftItem)} />}
          {rankingContent}
        </div>
      )}
      {auth === '' && rankingContent}
    </>
  )
}

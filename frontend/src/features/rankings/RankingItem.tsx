// Core
import React from 'react'
import './RankingItem.css'

// Types
import { RankingItem as TRankingItem } from '../../types/Ranking'

type RankingItemProps = {
  item: TRankingItem
  vote: () => void
}

export const RankingItem = (props: RankingItemProps) => (
  <div className="grid-item" onClick={() => props.vote()}>
    <img className="grid-item-img" src={props.item.imageSrc} />
    <p className="grid-item-name">{props.item.name}</p>
  </div>
)

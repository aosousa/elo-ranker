// Core
import React from 'react'
import './RankingItem.css'

export const RankingItem = (props) => (
  <div className="grid-item" onClick={() => props.vote()}>
    <img className="grid-item-img" src={props.item.imageSrc} />
    <div className="grid-item-name">{props.item.name}</div>
  </div>
)

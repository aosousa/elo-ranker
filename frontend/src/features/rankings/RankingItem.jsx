// Core
import React from 'react'
import './RankingItem.css'

export const RankingItem = (props) => (
  <div className="grid-item" onClick={() => props.vote()}>
    <img className="grid-item-img" src={props.item.imageSrc} height={400} width={400} />
    <p className="grid-item-name">{props.item.name}</p>
  </div>
)

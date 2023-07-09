// Core
import React from 'react'
import './RankingItem.css'

export const RankingItem = (props) => (
  <div className="grid-item" onClick={() => props.vote()}>
    <img className="grid-item-img" src={props.item.imageSrc} height={400} width={400} />
    <p className="w-1/2 font-semibold bg-black text-white p-2 rounded-md grid-item-name">{props.item.name}</p>
  </div>
)

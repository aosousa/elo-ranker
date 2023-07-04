// Core
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { store } from '../../app/store'

// Features
import { fetchRankings } from './rankingsSlice'

export const Rankings = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchRankings())
  })
}

import React from 'react'
import './FloatingActionButton.css'
import { BsChatText } from 'react-icons/bs'
import { FiSettings } from 'react-icons/fi'

const FloatingActionButton = ({ onClick }) => {
  return (
    <button className='floating-button' onClick={onClick}>
      <BsChatText className='icon' />
    </button>

  )
}

export default FloatingActionButton

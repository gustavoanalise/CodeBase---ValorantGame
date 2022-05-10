import React from 'react'
import './StartScreen.css'
import Logo from '../assets/valorant_logo1.png'

const StartScreen = ({startGame}) => {
  return (
    <div className='start'>
      <img className='logo' src={Logo} alt="" />
      <h1>Valorant Secret</h1>
      <h2>Jogo da Adivinhação</h2>
          <button onClick={startGame}>Começar o jogo</button>
    </div>
  )
}

export default StartScreen
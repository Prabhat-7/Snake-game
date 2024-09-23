import React, { useEffect, useRef, useState } from 'react'
import GamePieces from './GamePieces'

export default function GameState() {
  const [score, setScore] = useState(0)
  const [highestScore, setHighestScore] = useState(localStorage.getItem('highestScore') || "0")
  const [gameOver, setGameOver] = useState(false)
  const [collision, setCollision] = useState(null)
  const handleGameOver = (type) => {
    setGameOver(true)
    if (score > highestScore) {
      setHighestScore(score)
      localStorage.setItem("highestScore", score.toString())
    }
    setCollision(type)

  }
  const handleResetGame = () => {
    setScore(0)
    setGameOver(false)
  }
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver && e.key === "Enter") {
        handleResetGame()

      }
    }
    window.addEventListener("keydown", handleKeyPress)
  }, [gameOver])


  return (
    <div className='container'>
      <h1>{score}</h1>
      <p className='highest-score'>Highest Score:{highestScore}</p>
      {
        gameOver && (
          <div className='game-over'>
            <p>Game over!!{collision === "wall" ? "You Hit the wall!!" : "You ate yourshelf"}</p>
            <p className='restart-message'>Please press enter to restart the game.</p>
          </div>
        )
      }
      {!gameOver && <GamePieces setScore={setScore} setHighestScore={setHighestScore} handleGameOver={handleGameOver} />

      }
    </div>

  )
}

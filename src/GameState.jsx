import React, { useEffect, useRef, useState } from 'react'
import GameMode1 from './GameMode1.jsx'
import GameMode2 from './GameMode2.jsx'



export default function GameState(props) {
  const mode = props.mode
  const [score, setScore] = useState(0)
  const [highestScore, setHighestScore] = useState(localStorage.getItem('highestScore') || "0")
  const [gameOver, setGameOver] = useState(false)
  const [collision, setCollision] = useState(null)
  const handleGameOver = (type) => {
    setGameOver(true)
    if (score > highestScore) {
      setHighestScore(score

      )
      if (mode === "1")
        localStorage.setItem("highestScore1", score.toString())
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
      {!gameOver && mode === "1" && <GameMode1 setScore={setScore} setHighestScore={setHighestScore} handleGameOver={handleGameOver} />}
      {!gameOver && mode === "2" && <GameMode2 setScore={setScore} setHighestScore={setHighestScore} handleGameOver={handleGameOver} />}
      {!gameOver && mode === "3" && <GameMode3 setScore={setScore} setHighestScore={setHighestScore} handleGameOver={handleGameOver} />}
    </div>

  )
}

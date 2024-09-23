import React, { useEffect, useRef, useState } from 'react'

export default function GamePieces({ setScore, setHighestScore, handleGameOver }) {

  const canvasRef = useRef()
  const snakeSpeed = 14
  const [direction, setDirection] = useState(null)
  const [snake, setSnake] = useState([{ x: 98, y: 98 }, { x: 84, y: 98 }])
  const [food, setFood] = useState({ x: 14, y: 98 })


  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const drawSnake = () => {
      snake.forEach((snakePart) => {
        ctx.beginPath()
        ctx.rect(snakePart.x, snakePart.y, 14, 14)
        ctx.fillStyle = "#90ee90"
        ctx.fill()
        ctx.closePath()

      })
    }
    const drawFood = () => {
      ctx.beginPath()
      ctx.rect(food.x, food.y, 10, 10)
      ctx.fillStyle = "#ff0000"
      ctx.fill()
      ctx.closePath()
    }
    const moveSnake = () => {
      if (direction) {
        setSnake((previousSnake) => {
          const newSnake = [...previousSnake]
          const snakeHead = { x: newSnake[0].x, y: newSnake[0].y }
          for (let i = newSnake.length - 1; i > 0; i--) {
            newSnake[i] = newSnake[i - 1]
          }
          switch (direction) {
            case "right":
              snakeHead.x += snakeSpeed
              break;
            case "left":
              snakeHead.x -= snakeSpeed
              break;
            case "up":
              snakeHead.y -= snakeSpeed
              break;
            case "down":
              snakeHead.y += snakeSpeed
              break;
          }
          newSnake[0] = snakeHead
          return newSnake
        })
      }

    }
    const handleKeyPress = (e) => {
      switch (e.key) {
        case "w":
        case "ArrowUp":
          if (direction != "down") {  // Prevent moving up if currently moving down
            setDirection("up");
          }
          break;
        case "a":
        case "ArrowLeft":
          if (direction != "right") {  // Prevent moving left if currently moving right
            setDirection("left");
          }
          break;
        case "s":
        case "ArrowDown":
          if (!(direction == "up")) {  // Prevent moving down if currently moving up
            setDirection("down");
          }
          break;
        case "d":
        case "ArrowRight":
          if (direction != "left") {  // Prevent moving right if currently moving left
            setDirection("right");
          }
          break;
        default:
          break;  // Handle other keys or ignore them
      }
    };

    window.addEventListener("keydown", handleKeyPress)
    const handleFoodEaten = () => {

      setScore(prevScore => prevScore + 1)
      setSnake(prevSnake => [...prevSnake, { x: prevSnake[prevSnake.length - 1].x, y: prevSnake[prevSnake.length - 1].y }])
      setFood({ x: Math.floor(Math.random() * canvas.width / 14) * 14, y: Math.floor(Math.random() * canvas.height / 14) * 14 })

    }
    const checkForCollision = () => {
      if (snake[0].x + snakeSpeed > canvas.width || snake[0].x < 0 || snake[0].y + snakeSpeed > canvas.height || snake[0].y < 0) {
        handleGameOver("wall")
      }
      for (let i = 1; i < snake.length; i++) {

        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
          handleGameOver("ownBody")
        }

      }
    }

    const intervalId = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawFood()
      drawSnake()
      checkForCollision()
      if (food.x == snake[0].x && food.y == snake[0].y)
        handleFoodEaten()
      moveSnake()



    }, 100)
    return () => {
      clearTimeout(intervalId)
    }

  }, [direction, snake])


  return (
    <canvas ref={canvasRef} width={700} height={500}></canvas>
  )
}

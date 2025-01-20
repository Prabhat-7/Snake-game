import React, { useEffect, useRef, useState } from 'react'

export default function GamePieces({ setScore, handleGameOver }) {
    const canvasRef = useRef()
    const snakeSpeed = 14
    const [direction, setDirection] = useState(null)
    const [lastValidDirection, setLastValidDirection] = useState(null)
    const [snake, setSnake] = useState([{ x: 98, y: 98 }, { x: 84, y: 98 }])
    const [food, setFood] = useState({ x: 14, y: 98 })

    const isValidMove = (currentDirection, newDirection) => {
        if (!currentDirection) return true;

        const opposites = {
            up: "down",
            down: "up",
            left: "right",
            right: "left"
        };

        return opposites[currentDirection] !== newDirection;
    };

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
            if (!lastValidDirection) return;

            setSnake((previousSnake) => {
                const newSnake = [...previousSnake];
                const snakeHead = { x: newSnake[0].x, y: newSnake[0].y };

                switch (lastValidDirection) {
                    case "right":
                        snakeHead.x += snakeSpeed;
                        break;
                    case "left":
                        snakeHead.x -= snakeSpeed;
                        break;
                    case "up":
                        snakeHead.y -= snakeSpeed;
                        break;
                    case "down":
                        snakeHead.y += snakeSpeed;
                        break;
                }

                for (let i = newSnake.length - 1; i > 0; i--) {
                    newSnake[i] = { ...newSnake[i - 1] };
                }
                newSnake[0] = snakeHead;
                return newSnake;
            });
        };

        const handleKeyPress = (e) => {
            let newDirection = null;

            switch (e.key) {
                case "w":
                case "ArrowUp":
                    newDirection = "up";
                    break;
                case "a":
                case "ArrowLeft":
                    newDirection = "left";
                    break;
                case "s":
                case "ArrowDown":
                    newDirection = "down";
                    break;
                case "d":
                case "ArrowRight":
                    newDirection = "right";
                    break;
                default:
                    return;
            }

            if (isValidMove(lastValidDirection, newDirection)) {
                setDirection(newDirection);
                setLastValidDirection(newDirection);
            }
        };

        window.addEventListener("keydown", handleKeyPress)

        const handleFoodEaten = () => {
            setScore(prevScore => prevScore + 1)
            setSnake(prevSnake => [...prevSnake, { x: prevSnake[prevSnake.length - 1].x, y: prevSnake[prevSnake.length - 1].y }])
            setFood({ x: Math.floor(Math.random() * canvas.width / 14) * 14, y: Math.floor(Math.random() * canvas.height / 14) * 14 })
        }

        const handleWarp = () => {
            const newSnake = [...snake]
            const snakeHead = newSnake[0]
            if (snakeHead.x < 0) {
                snakeHead.x = canvas.width
            }
            else if (snakeHead.y < 0) {
                snakeHead.y = canvas.height
            }
            else if (snakeHead.x > canvas.width) {
                snakeHead.x = 0
            }
            else if (snakeHead.y > canvas.height) {
                snakeHead.y = 0
            }
            newSnake[0] = snakeHead
            setSnake(newSnake)
        }

        const checkForCollision = () => {
            if (
                snake[0].x < food.x + 14 && snake[0].x + 14 > food.x &&
                snake[0].y < food.y + 14 && snake[0].y + 14 > food.y
            ) {
                handleFoodEaten()
            }
            if (snake[0].x + snakeSpeed > canvas.width || snake[0].x < 0 || snake[0].y + snakeSpeed > canvas.height || snake[0].y < 0) {
                handleWarp()
            }
            for (let i = 1; i < snake.length; i++) {
                if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
                    handleGameOver("ownBody")
                }
            }
        }

        const intervalId = setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            drawFood()
            drawSnake()
            checkForCollision()
            moveSnake()
        }, 100)

        return () => {
            clearInterval(intervalId)
            window.removeEventListener("keydown", handleKeyPress)
        }
    }, [direction, snake, lastValidDirection])

    return (
        <canvas ref={canvasRef} width={900} height={450}></canvas>
    )
}
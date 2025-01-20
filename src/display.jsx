import { useState, useEffect } from "react";
import { SlTrophy } from "react-icons/sl";
import { Home } from "lucide-react";
import "./display.css";

import GameMode1 from './GameMode1.jsx';
import GameMode2 from './GameMode2.jsx';

export default function Display() {
    const [mode, setMode] = useState(0);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [score, setScore] = useState(0);
    const [highestScore, setHighestScore] = useState(localStorage.getItem(`highestScore${mode}`) || "0");
    const [gameOver, setGameOver] = useState(false);
    const [collision, setCollision] = useState(null);

    const handleGameOver = (type) => {
        setGameOver(true);
        if (score > parseInt(highestScore)) {
            setHighestScore(score);
            localStorage.setItem(`highestScore${mode}`, score.toString());
        }
        setCollision(type);
    };

    const handleResetGame = () => {
        setScore(0);
        setGameOver(false);
    };

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (gameOver && e.key === "Enter") {
                handleResetGame();
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [gameOver]);

    useEffect(() => {
        setHighestScore(localStorage.getItem(`highestScore${mode}`) || "0");
    }, [mode]);

    return (
        <div className="display">
            <header>
                <button
                    onClick={() => {
                        setIsButtonClicked(false);
                        setMode(0);
                        setCollision(null);
                        setGameOver(false);
                        setScore(0);
                    }}
                    className="home"
                >
                    <Home className="" />
                </button>
                <h1 className="title">SNAKE GAME</h1>
            </header>
            {mode === 0 && (
                <div className="content">
                    {!isButtonClicked && (
                        <button
                            type="button"
                            className="button"
                            onClick={() => setIsButtonClicked(true)}
                            style={{
                                margin: "auto",
                                display: "flex",
                            }}
                        >
                            New game
                        </button>
                    )}
                    {isButtonClicked && (
                        <div className="" role="group" aria-label="Vertical button group">
                            <button type="button" className="button" onClick={() => setMode(1)}>
                                MODE 1
                            </button>
                            <button type="button" className="button" onClick={() => setMode(2)}>
                                MODE 2
                            </button>
                        </div>
                    )}
                </div>
            )}
            {mode !== 0 && (
                <div className='game-content'>
                    <div className="scores">
                        <p className="score">{score}</p>
                        <p className="highestScore"><SlTrophy />{" "}{highestScore}</p>
                    </div>
                    <div className="playground">
                        {!gameOver && mode === 1 && <GameMode1 setScore={setScore} handleGameOver={handleGameOver} />}
                        {!gameOver && mode === 2 && <GameMode2 setScore={setScore} handleGameOver={handleGameOver} />}
                    </div>
                    {gameOver && (
                        <div className='restart'>
                            <p>Game Over! {collision === "wall" ? "You hit the wall!" : "You ate yourself!"}</p>
                            <p className="restart-message">Press Enter to restart.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

import React from 'react'
import { Link } from 'react-router-dom'

export default function gameMode() {
    return (
        <div><ul>
            <li><Link to="GameState1">Mode 1</Link></li>
            <li><Link to="GameState2">Mode 2</Link></li>

        </ul>
        </div>
    )
}

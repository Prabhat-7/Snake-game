import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Display from './display.jsx'
import GameState from './gameState.jsx'
import GameModes from './gameModes.jsx'
import GameMode1 from './GameMode1.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Display />
  },
  {
    path: "/GameModes",
    element: <GameModes />
  },
  {
    path: "/GameModes/GameState1",
    element: <GameState mode="1" />
  },
  {
    path: "/GameModes/GameState2",
    element: <GameState mode="2" />
  },
  {
    path: "/GameModes/GameState3",
    element: <GameState mode="3" />
  },
  {
    path: "/GameModes/GameState/GameMode1",
    element: <GameMode1 />
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

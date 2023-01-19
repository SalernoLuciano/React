import { useState } from 'react'
import confetti from 'canvas-confetti'
import Square from './components/Square'
import { TURNS } from './constants'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { resetGameStorage, saveGameToStorage } from './logic/storage'

function App () {
  // Inicializo el estado del tableron con el tablero guardado ( del localSotrage) o con null para que inicie vacio
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  // Inicializo el estado del turno ( Empieza la X)
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  // Estado par asaber el ganador del Juego ( null = no hay ganador, false = empate )
  const [winner, setWinner] = useState(null)

  function updateBoard (index) {
    // Evitar sobreescribir casillero ya seleccionado
    if (board[index] || winner) return

    // Actualizar el tablero con el jugador que esta en turno
    const newBoard = [...board]
    newBoard[index] = turn // ⚽ o ❌
    setBoard(newBoard)

    // Manejo el estado del cambio de turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    saveGameToStorage({ board: newBoard, turn: newTurn })

    // Revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // false = empate
    }
  }

  function resetGame () {
    // Setear todos los estados al estado inicial
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  return (
    <main className='board'>
      <h1>TIC TAC TOE</h1>
      <button onClick={resetGame}>Reset del Juego</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App

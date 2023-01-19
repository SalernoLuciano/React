export function saveGameToStorage({ board, turn }) {
  // Guardar partida luego del ultimo movimiento
  window.localStorage.setItem('board', JSON.stringify(board))
  window.localStorage.setItem('turn', turn)
}

export function resetGameStorage() {
  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
}
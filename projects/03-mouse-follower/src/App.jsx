import { useEffect, useState } from 'react'

function FollowMouse () {
  // Estado para activar y desactivar el seguimiento de la bolita
  const [enable, setEnable] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    function handleMove (event) {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }

    if (enable) {
      window.addEventListener('pointermove', handleMove)
    }

    // Limpiar efectos / suscripciones ( el addEventListener ) para no petar
    // Se ejecuta siempre que se desmonta el componente y cada vez que cambie la dependencia
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enable])

  function handleClick () {
    setEnable(!enable)
  }

  return (
    <>
      <div style={{
        position: 'absolute',
        background: '#09f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
      <button onClick={handleClick}>
        {enable ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </>
  )
}

function App () {
  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App

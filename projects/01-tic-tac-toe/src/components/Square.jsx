export default function Square({ children, updateBoard, index, isSelected }){
  const className = `square ${isSelected ? 'is-selected': ''}`

  function handleClick(){
    updateBoard( index )
  }
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}
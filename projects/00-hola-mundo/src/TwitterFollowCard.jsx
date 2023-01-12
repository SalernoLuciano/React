import { useState } from 'react'
import './TwitterFollowCard.css'

export function TwitterFollowCard({ children, userName = 'unknown', initialIsFollowing }) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)

  const texto = isFollowing? 'Siguiendo' : 'Seguir'
  const buttonClassName = isFollowing
    ? 'tw-followCard-button is-following '
    : 'tw-followCard-button'
  
  function handleClick(){
    setIsFollowing(!isFollowing)  
  }

  return (
    <article className='tw-followCard'>
      <header className='tw-followCard-header'>
        <img
          className='tw-followCard-avatar'
          src={`https://unavatar.io/${userName}`}
          alt="El avatar de Midudev" />
        <div className='tw-followCard-info'>
          <strong>{children}</strong>
          <span className='tw-followCard-infoUserName'>
            @{userName}
          </span>
        </div>
      </header>

      <aside>
        <button onClick={handleClick} className={buttonClassName}>
          <span className='tw-followCard-text'>{texto}</span>
          <span className='tw-followCard-button-stopFollow'>Dejar de Seguir</span>
        </button>
      </aside>
    </article>
  )
}
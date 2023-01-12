// import './App.css'
import { TwitterFollowCard } from "./TwitterFollowCard"

const users = [
  {
    userName: 'midudev',
    name: 'Miguel Angél Durán',
    isFolowing: true
  },
  {
    userName: 'pheralb',
    name: 'Pablo H.',
    isFolowing: false
  },
  {
    userName: 'PacoHdezs',
    name: 'Paco Hdez',
    isFolowing: true
  },
  {
    userName: 'TMChain',
    name: 'Tomás',
    isFolowing: false
  }
]

export function App() {

  return (
    <section className="App">

      {
        users.map(({ userName, name, isFolowing }) => (
          <TwitterFollowCard
            userName={userName}
            name={name}
            initialIsFollowing={isFolowing}
            key={userName}
          >
            {name}
          </TwitterFollowCard>
        ))
      }

    </section >
  )
}
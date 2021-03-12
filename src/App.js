// Components
import { Navbar, Song, Player, Library } from './components'
import { useContext } from 'react'
import { SongContext } from './context/songs.context'

import './styles/App.scss'

export default function App() {
  const { libraryMenuOpen } = useContext(SongContext)
  return (
    <main className={`App ${libraryMenuOpen ? 'menu-open' : ''}`}>
      <Navbar />
      <Song />
      <Player />
      <Library />
    </main>
  )
}

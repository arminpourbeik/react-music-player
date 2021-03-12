import { useContext } from 'react'
import { SongContext } from '../context/songs.context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
  const { setLibraryMenuOpen, libraryMenuOpen } = useContext(SongContext)
  return (
    <nav>
      <h1 className='animate__animated animate__fadeIn'>Waves Music</h1>
      <button
        onClick={() => {
          setLibraryMenuOpen(!libraryMenuOpen)
        }}
      >
        <FontAwesomeIcon icon={faMusic} />
        Library
      </button>
    </nav>
  )
}

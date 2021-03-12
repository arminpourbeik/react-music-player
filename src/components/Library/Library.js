import { useContext } from 'react'
import { SongContext } from '../../context/songs.context'
import LibraryDetail from './LibraryDetail'

export default function Library() {
  const { songs, libraryMenuOpen } = useContext(SongContext)

  return (
    <div className={`Library ${libraryMenuOpen ? 'library-menu-open' : ''}`}>
      <h1>Library</h1>
      {songs.map((song) => (
        <LibraryDetail key={song.id} song={song} />
      ))}
    </div>
  )
}

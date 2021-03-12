import { useContext } from 'react'
import { SongContext } from '../../context/songs.context'

export default function LibraryDetail({ song }) {
  const { changeSongHandler } = useContext(SongContext)

  return (
    <div
      className={`LibraryDetail ${song.active ? 'song-active' : ''} `}
      onClick={() => {
        changeSongHandler(song)
      }}
    >
      <img src={song.cover} alt={song.name} />
      <div className='song-description'>
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  )
}

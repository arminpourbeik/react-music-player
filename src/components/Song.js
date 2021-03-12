import { useContext } from 'react'
import { SongContext } from '../context/songs.context'

export default function Song() {
  const { currentSong } = useContext(SongContext)

  return (
    <div className='Song'>
      <div className='song-details'>
        <img src={currentSong.cover} alt={currentSong.name} />
        <h2>{currentSong.name}</h2>
        <h3>{currentSong.artist}</h3>
      </div>
    </div>
  )
}

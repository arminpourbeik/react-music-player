import { useState, createContext, useRef } from 'react'
import data from '../data'

export const SongContext = createContext()

export default function SongProvider({ children }) {
  // State
  const [songs, setSongs] = useState(data)
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [songInfo, setSongInfo] = useState({ duration: 0, currentTime: 0 })
  const [libraryMenuOpen, setLibraryMenuOpen] = useState(false)

  // Ref
  const audioRef = useRef()

  function audioPlayHandler() {
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  function timeUpdateHandler(e) {
    const current = e.target.currentTime
    const duration = e.target.duration
    setSongInfo({ ...songInfo, duration, currentTime: current })
  }

  function dragHandler(e) {
    audioRef.current.currentTime = e.target.value
    setSongInfo({ ...songInfo, currentTime: e.target.value })
  }

  function setActiveSong(songId) {
    setSongs(
      songs.map((song) => {
        if (song.id === songId) return { ...song, active: true }
        else return { ...song, active: false }
      })
    )
  }

  async function changeSongHandler(song) {
    await setCurrentSong(song)
    if (isPlaying) {
      audioRef.current.play()
    }
    setActiveSong(song.id)
  }

  async function songEndHandler(e) {
    // Jump to next song, if `playing` start play
    const currentSongIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    )
    await setCurrentSong(songs[(currentSongIndex + 1) % songs.length])
    const newSongId = songs[(currentSongIndex + 1) % songs.length].id
    setActiveSong(newSongId)
    if (isPlaying) audioRef.current.play()
  }

  async function skipTrackHandler(direction) {
    const currentSongIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    )
    if (direction === 'skip-forward') {
      await setCurrentSong(songs[(currentSongIndex + 1) % songs.length])
      const newSongId = songs[(currentSongIndex + 1) % songs.length].id
      setActiveSong(newSongId)
    }
    if (direction === 'skip-backward') {
      if (currentSongIndex - (1 % songs.length) === -1) {
        await setCurrentSong(songs[songs.length - 1])
        const newSongId = songs[songs.length - 1].id
        setActiveSong(newSongId)
        return
      }
      await setCurrentSong(songs[(currentSongIndex - 1) % songs.length])
      const newSongId = songs[(currentSongIndex - 1) % songs.length].id
      setActiveSong(newSongId)
    }
    if (isPlaying) audioRef.current.play()
  }

  return (
    <SongContext.Provider
      value={{
        songs,
        setSongs,
        currentSong,
        setCurrentSong,
        audioPlayHandler,
        isPlaying,
        setIsPlaying,
        songInfo,
        dragHandler,
        changeSongHandler,
        skipTrackHandler,
        libraryMenuOpen,
        setLibraryMenuOpen,
      }}
    >
      <>
        {children}
        <audio
          ref={audioRef}
          src={currentSong.audio}
          onTimeUpdate={timeUpdateHandler}
          onEnded={songEndHandler}
        />
      </>
    </SongContext.Provider>
  )
}

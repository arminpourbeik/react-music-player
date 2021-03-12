import { useContext } from 'react'
import { SongContext } from '../context/songs.context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlay,
  faForward,
  faBackward,
  faPause,
} from '@fortawesome/free-solid-svg-icons'

export default function Player() {
  const {
    audioPlayHandler,
    isPlaying,
    songInfo,
    dragHandler,
    skipTrackHandler,
  } = useContext(SongContext)

  function getTime(time) {
    return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
  }

  return (
    <div className='Player'>
      <div className='player-details'>
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          type='range'
          min={0}
          max={songInfo.duration || ''}
          value={songInfo.currentTime}
          onChange={dragHandler}
        />
        <p>{getTime(songInfo.duration || '')}</p>
      </div>
      <div className='player-controls'>
        <button>
          <FontAwesomeIcon
            icon={faBackward}
            size='2x'
            onClick={() => {
              skipTrackHandler('skip-backward')
            }}
          />
        </button>
        <button onClick={audioPlayHandler}>
          <FontAwesomeIcon
            icon={isPlaying ? faPause : faPlay}
            size='2x'
            className={`${
              isPlaying ? 'animate__animated animate__flipInX' : ''
            }`}
          />
        </button>
        <button>
          <FontAwesomeIcon
            icon={faForward}
            size='2x'
            onClick={() => {
              skipTrackHandler('skip-forward')
            }}
          />
        </button>
      </div>
    </div>
  )
}

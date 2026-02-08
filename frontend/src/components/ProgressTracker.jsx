import { useEffect, useState } from 'react'
import { socket } from '../services/socket'

export default function ProgressTracker({ user }) {
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState('Idle')

  useEffect(() => {
    socket.emit('join', user.id)

    socket.on('progress', data => {
      setProgress(data.progress)
      setStage(data.stage)
    })

    return () => socket.off('progress')
  }, [])

  return (
    <div className="progress-box">
      <p>{stage}</p>
      <div className="bar">
        <div className="fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}

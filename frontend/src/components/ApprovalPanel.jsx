import { useEffect, useState } from 'react'
import axios from 'axios'

export default function ApprovalPanel() {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    axios.get('/api/approval/pending').then(res => {
      setVideos(res.data)
    })
  }, [])

  return (
    <div className="approval-panel">
      <h2>AI Approval Queue</h2>

      {videos.map(v => (
        <div key={v._id} className="approval-card">
          <p>Confidence: {v.aiConfidenceScore}%</p>
          <p>{v.aiReasoning}</p>

          <button onClick={() => approve(v._id)}>Approve</button>
          <button onClick={() => reject(v._id)}>Reject</button>
          <button onClick={() => override(v._id)}>Override AI</button>
        </div>
      ))}
    </div>
  )
}

const approve = id => axios.post(`/api/approval/${id}/approve`)
const reject = id => axios.post(`/api/approval/${id}/reject`, { reason: 'Manual reject' })
const override = id => axios.post(`/api/approval/${id}/override`, { reason: 'Human override' })

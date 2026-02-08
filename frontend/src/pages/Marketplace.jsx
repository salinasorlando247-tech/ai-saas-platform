import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Marketplace() {
  const [items, setItems] = useState([])

  useEffect(() => {
    axios.get('/api/marketplace/browse').then(res => {
      setItems(res.data)
    })
  }, [])

  return (
    <div>
      <h1>ForgeAI Marketplace</h1>
      {items.map(item => (
        <div key={item._id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <button onClick={() => install(item._id)}>
            Install — ${item.price}
          </button>
        </div>
      ))}
    </div>
  )
}

const install = id => axios.post(`/api/marketplace/install/${id}`)

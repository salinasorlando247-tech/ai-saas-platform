import { useState, useEffect } from "react"

export default function Scheduler(){
  const [scheduled,setScheduled] = useState([])
  const [content,setContent] = useState("")
  const [platforms,setPlatforms] = useState([])
  const [time,setTime] = useState("")

  const fetchScheduled = async ()=>{
    const res = await fetch("http://localhost:5000/api/scheduler/list")
    const data = await res.json()
    setScheduled(data.posts)
  }

  const schedule = async ()=>{
    await fetch("http://localhost:5000/api/scheduler/add",{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body: JSON.stringify({ content, media:null, platforms, postTime:time })
    })
    fetchScheduled()
  }

  const togglePlatform = (p)=>{
    if(platforms.includes(p)) setPlatforms(platforms.filter(x=>x!==p))
    else setPlatforms([...platforms,p])
  }

  useEffect(()=>{ fetchScheduled() },[])

  return (
    <div style={{ border:"1px solid #0ff", padding:"1rem", borderRadius:"10px" }}>
      <h3>Schedule Post</h3>
      <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Post content"/>
      <input type="datetime-local" value={time} onChange={e=>setTime(e.target.value)}/>
      <div>
        {["youtube","instagram","tiktok","linkedin","snapchat"].map(p=>(
          <label key={p} style={{ margin:"0.5rem" }}>
            <input type="checkbox" onChange={()=>togglePlatform(p)}/> {p.charAt(0).toUpperCase()+p.slice(1)}
          </label>
        ))}
      </div>
      <button onClick={schedule} style={{ marginTop:"0.5rem", background:"#0ff", border:"none", padding:"0.5rem 1rem" }}>Schedule</button>

      <h4>Scheduled Posts</h4>
      <ul>
        {scheduled.map((s,i)=><li key={i}>{s.content} - {s.postTime}</li>)}
      </ul>
    </div>
  )
}

import { useState } from "react"

export default function PostCreator(){
  const [content,setContent] = useState("")
  const [platforms,setPlatforms] = useState([])

  const togglePlatform = (p)=>{
    if(platforms.includes(p)) setPlatforms(platforms.filter(x=>x!==p))
    else setPlatforms([...platforms,p])
  }

  const publish = async ()=>{
    await fetch("http://localhost:5000/api/scheduler/add",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ content, media:null, platforms, postTime:new Date().toISOString() })
    })
    alert("Post sent!")
  }

  return (
    <div style={{ border:"1px solid #0ff", padding:"1rem", borderRadius:"10px" }}>
      <h3>Create Post</h3>
      <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Post content" style={{ width:"100%", height:"80px" }}/>
      <div>
        {["youtube","instagram","tiktok","linkedin","snapchat"].map(p=>(
          <label key={p} style={{ margin:"0.5rem" }}>
            <input type="checkbox" onChange={()=>togglePlatform(p)}/> {p.charAt(0).toUpperCase()+p.slice(1)}
          </label>
        ))}
      </div>
      <button onClick={publish} style={{ marginTop:"0.5rem", background:"#0ff", border:"none", padding:"0.5rem 1rem" }}>Publish</button>
    </div>
  )
}

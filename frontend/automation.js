const API_INTERNAL = 'http://localhost:5000/api/internal'
const API_ADMIN = 'http://localhost:5000/api/admin'
let socket = null

// Initialize WebSocket
function initSocket(){
  socket = io('http://localhost:5000')
  socket.on('connect', ()=>console.log('Connected to WebSocket'))

  socket.on('jobUpdate', data => {
    updateJobRow(data)
  })
}

function logout(){
  window.location.href = 'index.html'
}

// Create a new job
async function createJob(){
  const prompt = document.getElementById('job-prompt').value
  const type = document.getElementById('job-type').value

  const res = await fetch(`${API_INTERNAL}/ai`,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ prompt, jobId:crypto.randomUUID(), type })
  })
  const data = await res.json()
  addJobRow(data.jobId, type, 'queued', prompt)
}

// Job table management
function addJobRow(id, type, status, prompt, result='-', cost='-'){
  const tbody = document.querySelector('#jobs-table tbody')
  const tr = document.createElement('tr')
  tr.id = `job-${id}`
  tr.innerHTML = `<td>${id}</td><td>${type}</td><td>${status}</td><td>${prompt}</td><td>${result}</td><td>${cost}</td>`
  tbody.appendChild(tr)
}

function updateJobRow(job){
  const tr = document.getElementById(`job-${job.jobId}`)
  if(tr){
    tr.children[2].textContent = job.status
    tr.children[4].textContent = job.result?.output || '-'
    tr.children[5].textContent = job.cost || '-'
  }
}

// Fetch current jobs
async function loadJobs(){
  const res = await fetch(`${API_ADMIN}/jobs`, { headers:{ 'Authorization': 'Bearer internalToken' } })
  const jobs = await res.json()
  jobs.forEach(j=>{
    addJobRow(j.id, j.type, j.status, j.prompt, j.result?.output, j.cost)
  })
}

// Fetch usage info
async function loadUsage(){
  const res = await fetch(`${API_ADMIN}/usage`, { headers:{ 'Authorization': 'Bearer internalToken' } })
  const data = await res.json()
  document.getElementById('usage').textContent = JSON.stringify(data,null,2)
}

// Initialize dashboard
window.onload = ()=>{
  initSocket()
  loadJobs()
  loadUsage()
  setInterval(loadUsage, 60000) // refresh usage every 60s
}

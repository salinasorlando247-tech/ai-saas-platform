const API = 'http://localhost:5000/api/public'
let token = localStorage.getItem('token') || null

function showDashboard() {
  document.getElementById('login-section').style.display = 'none'
  document.getElementById('dashboard-section').style.display = 'block'
  document.getElementById('username').textContent = localStorage.getItem('email')
  loadUsage()
}

async function login() {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const res = await fetch(`${API}/auth/login`, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ email, password })
  })
  const data = await res.json()
  if(data.accessToken){
    token = data.accessToken
    localStorage.setItem('token', token)
    localStorage.setItem('email', email)
    showDashboard()
  } else {
    document.getElementById('login-msg').textContent = data.error
  }
}

async function signup() {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const res = await fetch(`${API}/auth/signup`, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ email, password })
  })
  const data = await res.json()
  if(data.accessToken){
    token = data.accessToken
    localStorage.setItem('token', token)
    localStorage.setItem('email', email)
    showDashboard()
  } else {
    document.getElementById('login-msg').textContent = data.error
  }
}

function logout() {
  token = null
  localStorage.removeItem('token')
  localStorage.removeItem('email')
  document.getElementById('login-section').style.display = 'block'
  document.getElementById('dashboard-section').style.display = 'none'
}

async function askAI() {
  const prompt = document.getElementById('prompt').value
  const res = await fetch(`${API}/ai`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'x-api-key': token
    },
    body: JSON.stringify({ prompt })
  })
  const data = await res.json()
  document.getElementById('output').textContent = JSON.stringify(data,null,2)
}

async function createVideo() {
  alert("AI video creation triggered (internal job queued).")
}

async function manualUpload() {
  alert("Manual upload interface (future).")
}

async function loadUsage(){
  const res = await fetch(`${API}/usage`,{
    headers:{ 'x-api-key': token }
  })
  const data = await res.json()
  document.getElementById('usage').textContent = JSON.stringify(data,null,2)
}

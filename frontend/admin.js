async function loadAdmin(){

  const users = await fetch("http://localhost:5000/api/admin/users")
  const jobs = await fetch("http://localhost:5000/api/admin/jobs")

  const u = await users.json()
  const j = await jobs.json()

  document.getElementById("users").innerText =
    JSON.stringify(u,null,2)

  document.getElementById("jobs").innerText =
    JSON.stringify(j,null,2)
}

async function suspendUser(email){

  await fetch("http://localhost:5000/api/admin/suspend",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email})
  })

  alert("User suspended")
}

loadAdmin()

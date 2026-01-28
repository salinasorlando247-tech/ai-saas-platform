import express from "express"
import fs from "fs"
import { v4 as uuidv4 } from "uuid"
import { hashPassword, comparePassword } from "./password.js"
import { generateToken } from "./jwt.js"
import { sendEmail } from "../emailService.js"

const router = express.Router()

// ---------- SIGNUP ----------
router.post("/signup", async (req,res)=>{

  const { email, password } = req.body

  const db = JSON.parse(fs.readFileSync("./users.json"))

  if(db.users.find(u=>u.email===email)){
    return res.status(400).send("User already exists")
  }

  const hashed = await hashPassword(password)
  const token = uuidv4()

  const user = {
    email,
    password: hashed,
    tier: "starter",
    role: "user",
    suspended: false,
    verified: false,
    verifyToken: token,
    resetToken: null
  }

  db.users.push(user)
  fs.writeFileSync("./users.json", JSON.stringify(db,null,2))

  const link = `${process.env.APP_URL}/api/auth/verify/${token}`

  await sendEmail(
    email,
    "Verify Your Account",
    `<h2>Verify Account</h2>
     <a href="${link}">Click to verify your email</a>`
  )

  res.json({ message: "Verification email sent" })
})

// ---------- VERIFY EMAIL ----------
router.get("/verify/:token", (req,res)=>{

  const token = req.params.token
  const db = JSON.parse(fs.readFileSync("./users.json"))

  const user = db.users.find(u=>u.verifyToken === token)

  if(!user) return res.status(400).send("Invalid token")

  user.verified = true
  user.verifyToken = null

  fs.writeFileSync("./users.json", JSON.stringify(db,null,2))

  res.send("Email verified. You may login.")
})

// ---------- LOGIN ----------
router.post("/login", async (req,res)=>{

  const { email, password } = req.body
  const db = JSON.parse(fs.readFileSync("./users.json"))

  const user = db.users.find(u=>u.email===email)

  if(!user) return res.status(404).send("User not found")

  if(user.suspended) return res.status(403).send("Account suspended")

  if(!user.verified) return res.status(401).send("Email not verified")

  const valid = await comparePassword(password, user.password)

  if(!valid) return res.status(401).send("Invalid credentials")

  const token = generateToken(user)

  res.json({ token })
})

// ---------- FORGOT PASSWORD ----------
router.post("/forgot", async (req,res)=>{

  const { email } = req.body
  const db = JSON.parse(fs.readFileSync("./users.json"))

  const user = db.users.find(u=>u.email===email)

  if(!user) return res.send("If exists, email sent")

  const token = uuidv4()
  user.resetToken = token

  fs.writeFileSync("./users.json", JSON.stringify(db,null,2))

  const link = `${process.env.APP_URL}/reset.html?token=${token}`

  await sendEmail(
    email,
    "Password Reset",
    `<a href="${link}">Reset Password</a>`
  )

  res.send("Password reset email sent")
})

// ---------- RESET PASSWORD ----------
router.post("/reset", async (req,res)=>{

  const { token, newPassword } = req.body

  const db = JSON.parse(fs.readFileSync("./users.json"))

  const user = db.users.find(u=>u.resetToken === token)

  if(!user) return res.status(400).send("Invalid token")

  user.password = await hashPassword(newPassword)
  user.resetToken = null

  fs.writeFileSync("./users.json", JSON.stringify(db,null,2))

  res.send("Password updated")
})

export default router

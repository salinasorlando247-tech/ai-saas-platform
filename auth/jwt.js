import jwt from "jsonwebtoken"

export function generateToken(user){

  return jwt.sign(
    {
      email: user.email,
      role: user.role,
      tier: user.tier
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  )
}

export function verifyToken(req,res,next){

  const token = req.headers.authorization

  if(!token) return res.status(401).send("No token")

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()

  } catch {
    res.status(401).send("Invalid token")
  }
}

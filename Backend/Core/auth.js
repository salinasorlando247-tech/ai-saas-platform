export function requireAdmin(req,res,next){

  if(req.headers.role !== "admin"){
    return res.status(403).send("Forbidden")
  }

  next()
}

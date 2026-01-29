export function requireCredits(cost){
  return (req,res,next)=>{
    const userCredits = req.user?.credits || 0
    if(userCredits < cost) return res.status(402).json({error:"Not enough credits"})
    req.user.credits -= cost
    next()
  }
}

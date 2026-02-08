module.exports = (requiredPlan)=>{

  return (req,res,next)=>{

    const userPlan = req.user.plan;

    const levels = {
      starter:1,
      pro:2,
      enterprise:3
    };

    if(levels[userPlan] < levels[requiredPlan]){
      return res.status(403).json({error:"Upgrade plan required"});
    }

    next();
  };

};

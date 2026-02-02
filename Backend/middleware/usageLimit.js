const { Pool } = require("pg");
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

module.exports = (limit)=>{

  return async (req,res,next)=>{

    const userId = req.user.id;

    const result = await pool.query(
      "SELECT videos_used, plan FROM users WHERE id=$1",
      [userId]
    );

    const user = result.rows[0];

    const limits = {
      starter:30,
      pro:150,
      enterprise:999999
    };

    if(user.videos_used >= limits[user.plan]){
      return res.status(403).json({error:"Monthly quota exceeded"});
    }

    next();
  };

};

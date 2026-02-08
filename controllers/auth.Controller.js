import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import db from "../config/db.js";

export async function register(req,res){
  const {email,password} = req.body;

  const hash = await bcrypt.hash(password,12);

  await db.query(
    "INSERT INTO users(id,email,password) VALUES (?,?,?)",
    [uuid(), email, hash]
  );

  res.json({success:true});
}

export async function login(req,res){
  const {email,password} = req.body;

  const [user] = await db.query(
    "SELECT * FROM users WHERE email=?",[email]
  );

  const valid = await bcrypt.compare(password,user.password);

  if(!valid) return res.status(401).send("Invalid");

  const token = jwt.sign(
    {id:user.id},
    process.env.JWT_SECRET,
    {expiresIn:"15m"}
  );

  res.json({token});
}

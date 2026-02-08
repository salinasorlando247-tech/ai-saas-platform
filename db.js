import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Salinas3!",
  database: "ai_video_platform",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;

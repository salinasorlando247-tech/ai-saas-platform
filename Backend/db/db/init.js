const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const schemaPath = path.join(__dirname, "schema.sql");
const schema = fs.readFileSync(schemaPath, "utf8");

async function init() {
  try {
    console.log("Initializing database...");

    // Run the schema SQL
    await pool.query(schema);

    console.log("Database initialized successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error initializing database:", err);
    process.exit(1);
  }
}

init();

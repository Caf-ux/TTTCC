const sqlite3 = require("sqlite3").verbose()
const bcrypt = require("bcrypt")

const db = new sqlite3.Database("./database.db")

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      role TEXT,
      api_key TEXT
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS bans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      roblox_id TEXT,
      roblox_username TEXT,
      reason TEXT,
      banned_by TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // CEO FIXO
  const CEO_USER = "CEO"
  const CEO_PASS = "ASENHADOMANOKÁCEO"
  const CEO_KEY = "TCO-CEO-MASTER"
  
  db.get("SELECT * FROM users WHERE role = 'CEO'", async (_, row) => {
    if (!row) {
      const hash = await bcrypt.hash(CEO_PASS, 10)
      db.run(
        "INSERT INTO users (username,password,role,api_key) VALUES (?,?,?,?)",
        [CEO_USER, hash, "CEO", CEO_KEY]
      )
      console.log("✅ CEO account created")
    }
  })
})

module.exports = db

const express = require("express")
const path = require("path")
const cors = require("cors")

const authRoutes = require("./routes/auth")
const bansRoutes = require("./routes/bans")

const app = express()

// MIDDLEWARES
app.use(cors())
app.use(express.json())

// SERVIR FRONTEND
app.use(express.static(path.join(__dirname, "public")))

// ROTAS API
app.use("/api", authRoutes)
app.use("/api/bans", bansRoutes)

// ROTA RAIZ (GARANTIA)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

// FALLBACK (DEBUG)
app.use((req, res) => {
  res.status(404).send("404 - TCO route not found")
})

// LISTEN — IMPORTANTE NO WINDOWS
app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000")
})

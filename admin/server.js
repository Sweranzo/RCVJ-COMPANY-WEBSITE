require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Database Connection ---
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "rcvj_db",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL database!");
});

// --- LOGIN ---
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM admin_users WHERE username = ? AND password = ?";

  db.query(sql, [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length > 0)
      return res.json({ success: true, message: "Login successful" });
    res.json({ success: false, message: "Invalid credentials" });
  });
});

// --- JOB LISTINGS ---
app.get("/public-jobs", (req, res) => {
  const sql = "SELECT * FROM job_listings ORDER BY date_posted DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

app.get("/jobs", (req, res) => {
  const sql = "SELECT * FROM job_listings ORDER BY date_posted DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

app.post("/add-job", (req, res) => {
  const { title, description, location } = req.body;
  const sql = "INSERT INTO job_listings (title, description, location) VALUES (?, ?, ?)";
  db.query(sql, [title, description, location], (err) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ success: true, message: "Job added successfully!" });
  });
});

app.put("/edit-job/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, location } = req.body;
  const sql = "UPDATE job_listings SET title = ?, description = ?, location = ? WHERE id = ?";
  db.query(sql, [title, description, location, id], (err) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ success: true, message: "Job updated successfully!" });
  });
});

app.delete("/delete-job/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM job_listings WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ success: true, message: "Job deleted successfully!" });
  });
});

// --- APPLY FOR JOB ---
app.post("/apply-job", (req, res) => {
  const { job_id, name, email, message } = req.body;
  const sql =
    "INSERT INTO job_applications (job_id, name, email, message) VALUES (?, ?, ?, ?)";
  db.query(sql, [job_id, name, email, message], (err) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ message: "Application submitted successfully!" });
  });
});

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

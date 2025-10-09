const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "rcvj_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM admin_users WHERE username = ? AND password = ?";
  
  db.query(sql, [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length > 0) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  });
});

// Public route to fetch all job listings
app.get("/public-jobs", (req, res) => {
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
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "Job added successfully!" });
  });
});

// Add new job
app.post("/add-job", (req, res) => {
  const { title, description, location } = req.body;
  const sql = "INSERT INTO job_listings (title, description, location) VALUES (?, ?, ?)";
  db.query(sql, [title, description, location], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ success: true, message: "Job added successfully" });
  });
});

// Get all jobs
app.get("/jobs", (req, res) => {
  const sql = "SELECT * FROM job_listings ORDER BY date_posted DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

// Delete a job
app.delete("/delete-job/:id", (req, res) => {
  const jobId = req.params.id;
  const sql = "DELETE FROM job_listings WHERE id = ?";
  db.query(sql, [jobId], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ success: true, message: "Job deleted successfully" });
  });
});

// Edit (Update) a job
app.put("/edit-job/:id", (req, res) => {
  const jobId = req.params.id;
  const { title, description, location } = req.body;
  const sql = "UPDATE job_listings SET title = ?, description = ?, location = ? WHERE id = ?";
  db.query(sql, [title, description, location, jobId], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ success: true, message: "Job updated successfully" });
  });
});


app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
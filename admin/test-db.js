import mysql from "mysql2";

const db = mysql.createConnection({
  host: "nozomi.proxy.rlwy.net",
  user: "root",
  password: "EINxaLtYuhLVStakJDkoTCXEpmciHUCA",
  database: "railway",
  port: 54180,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Database connected successfully!");
  }
  db.end();
});

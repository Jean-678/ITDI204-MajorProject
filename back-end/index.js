const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "vanuatu_centralized_tourism_spa",
  password: "Deni2005",
  port: 5432,
});

app.get("/accommodations", async (req, res) => {
  const result = await pool.query("SELECT * FROM accommodations");
  res.json(result.rows);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.get("/car-rentals", async (req, res) => {
  const result = await pool.query("SELECT * FROM car_rentals");
  res.json(result.rows);
});

app.get("/tours", async (req, res) => {
  const result = await pool.query("SELECT * FROM tour_operators");
  res.json(result.rows);
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check if user exists
    const existing = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existing.rows.length > 0) {
      return res.json({ error: "User already exists" });
    }

    // insert user
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    );

    res.json({
      message: "Signup successful",
      user: result.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during signup" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.json({ error: "User not found" });
    }

    const user = result.rows[0];

    if (user.password !== password) {
      return res.json({ error: "Incorrect password" });
    }

    res.json({ user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during login" });
  }
});
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
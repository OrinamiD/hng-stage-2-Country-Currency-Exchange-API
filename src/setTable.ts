// src/setupTables.js
import pool from "./configs/db.configs.js";

const setupTables = async () => {
  const queries = [
    `CREATE TABLE IF NOT EXISTS countries (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      capital VARCHAR(255),
      region VARCHAR(255),
      population BIGINT NOT NULL,
      currency_code VARCHAR(16),
      exchange_rate DOUBLE PRECISION,
      estimated_gdp DOUBLE PRECISION,
      flag_url VARCHAR(1024),
      last_refreshed_at TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS metadata (
      key VARCHAR(100) PRIMARY KEY,
      value TEXT
    );`
  ];

  try {
    for (const query of queries) {
      await pool.query(query);
    }
    console.log("✅ Tables are ready (countries + metadata)");
  } catch (err) {
    console.error("❌ Error creating tables:", err);
  }
};

setupTables();

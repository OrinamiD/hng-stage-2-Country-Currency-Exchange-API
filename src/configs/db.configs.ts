// import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { Pool } from "pg";
// export const port = process.env.PORT || 5000;
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default pool;

//  host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT) as number,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,

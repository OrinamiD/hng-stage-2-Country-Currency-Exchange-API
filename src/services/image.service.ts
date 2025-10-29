// import { createCanvas } from "canvas";
// import pool from "../configs/db.configs.js";
// import fs from "fs";
// import path from "path";

// export const generateSummaryImage = async () => {
//   const client = await pool.connect();
//   try {
//     // Fetch top 5 countries by GDP
//     const topResult = await client.query(
//       "SELECT * FROM countries ORDER BY estimated_gdp DESC LIMIT 5"
//     );
//     const topCountries = topResult.rows;

//     // Fetch total number of countries
//     const countResult = await client.query(
//       "SELECT COUNT(*) AS total FROM countries"
//     );
//     const totalCountries = parseInt(countResult.rows[0].total, 10);

//     const lastRefreshedAt = new Date();

//     // Create canvas
//     const canvas = createCanvas(800, 400);
//     const ctx = canvas.getContext("2d");

//     // Background
//     ctx.fillStyle = "#ffffff";
//     ctx.fillRect(0, 0, 800, 400);

//     // Text
//     ctx.fillStyle = "#000000";
//     ctx.font = "20px Arial";
//     ctx.fillText(`Total Countries: ${totalCountries}`, 50, 50);
//     ctx.fillText(`Last Refreshed: ${lastRefreshedAt.toISOString()}`, 50, 80);
//     ctx.fillText("Top 5 Countries by GDP:", 50, 120);

//     let y = 160;
//     topCountries.forEach((c: any, i: number) => {
//       ctx.fillText(`${i + 1}. ${c.name} - ${c.estimated_gdp.toFixed(2)}`, 70, y);
//       y += 30;
//     });

//     // Save to cache
//     const outDir = path.join(__dirname, "../../cache");
//     if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

//     const buffer = canvas.toBuffer("image/png");
//     fs.writeFileSync(path.join(outDir, "summary.png"), buffer);
//   } finally {
//     client.release();
//   }
// };

import { createCanvas } from "canvas";
import pool from "../configs/db.configs.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateSummaryImage = async () => {
  const client = await pool.connect();
  try {
    const topResult = await client.query(
      "SELECT * FROM countries ORDER BY estimated_gdp DESC NULLS LAST LIMIT 5"
    );
    const topCountries = topResult.rows;

    const countResult = await client.query(
      "SELECT COUNT(*) AS total FROM countries"
    );
    const totalCountries = parseInt(countResult.rows[0].total, 10);

    const metaResult = await client.query(
      "SELECT value FROM metadata WHERE key=$1",
      ["last_refreshed_at"]
    );
    const lastRefreshedAt = metaResult.rows[0]?.value || new Date().toISOString();

    const canvas = createCanvas(800, 400);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 800, 400);

    ctx.fillStyle = "#000000";
    ctx.font = "22px Arial";
    ctx.fillText(`Total Countries: ${totalCountries}`, 50, 50);
    ctx.fillText(`Last Refreshed: ${lastRefreshedAt}`, 50, 85);
    ctx.fillText("Top 5 Countries by Estimated GDP:", 50, 125);

    let y = 160;
    topCountries.forEach((c: any, i: number) => {
      const gdpText = c.estimated_gdp !== null ? c.estimated_gdp.toFixed(2) : "N/A";
      ctx.fillText(`${i + 1}. ${c.name} - ${gdpText}`, 70, y);
      y += 30;
    });

    const outDir = path.join(__dirname, "../../cache");
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(path.join(outDir, "summary.png"), buffer);
  } finally {
    client.release();
  }
};


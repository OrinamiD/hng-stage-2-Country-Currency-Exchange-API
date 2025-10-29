import axios from "axios";
import pool from "../configs/db.configs.js";
import type { Country } from "../types.js";
import { generateSummaryImage } from "./image.service.js";

const COUNTRIES_API =
  "https://restcountries.com/v2/all?fields=name,capital,region,population,flag,currencies";
const EXCHANGE_API = "https://open.er-api.com/v6/latest/USD";

export const refreshCountry = async () => {
  const client = await pool.connect();
  try {
    // Fetch external APIs separately for precise error handling
    let countries: any[], rates: Record<string, number>;
    try {
      const countriesRes = await axios.get(COUNTRIES_API);
      countries = countriesRes.data;
    } catch {
      throw new Error("Could not fetch data from Countries API");
    }

    try {
      const ratesRes = await axios.get(EXCHANGE_API);
      rates = ratesRes.data.rates;
    } catch {
      throw new Error("Could not fetch data from Exchange Rates API");
    }

    const lastRefreshedAt = new Date();

    await client.query("BEGIN");

    for (const c of countries) {
      const currency = c.currencies?.[0]?.code || null;
      const exchangeRate =
        currency && rates[currency] !== undefined ? rates[currency] : null;
      const randomMultiplier =
        Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
      const estimated_gdp =
        c.population && exchangeRate !== null
          ? (c.population * randomMultiplier) / exchangeRate
          : null;

      const country: Country = {
        name: c.name,
        capital: c.capital || null,
        region: c.region || null,
        population: c.population,
        currency_code: currency,
        exchange_rate: exchangeRate,
        estimated_gdp,
        flag_url: c.flag || null,
        last_refreshed_at: lastRefreshedAt,
      };

      await client.query(
        `
        INSERT INTO countries
          (name, capital, region, population, currency_code, exchange_rate, estimated_gdp, flag_url, last_refreshed_at)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        ON CONFLICT (name) DO UPDATE SET
          capital = EXCLUDED.capital,
          region = EXCLUDED.region,
          population = EXCLUDED.population,
          currency_code = EXCLUDED.currency_code,
          exchange_rate = EXCLUDED.exchange_rate,
          estimated_gdp = EXCLUDED.estimated_gdp,
          flag_url = EXCLUDED.flag_url,
          last_refreshed_at = EXCLUDED.last_refreshed_at
        `,
        [
          country.name,
          country.capital,
          country.region,
          country.population,
          country.currency_code,
          country.exchange_rate,
          country.estimated_gdp,
          country.flag_url,
          country.last_refreshed_at,
        ]
      );
    }

    // Update global last refreshed timestamp
    await client.query(
      `
      INSERT INTO metadata(key,value)
      VALUES ('last_refreshed_at',$1)
      ON CONFLICT(key) DO UPDATE SET value=EXCLUDED.value
      `,
      [lastRefreshedAt.toISOString()]
    );

    await client.query("COMMIT");

    // Generate summary image
    await generateSummaryImage();

    return {
      message: "Countries refreshed successfully",
      last_refreshed_at: lastRefreshedAt,
    };
  } catch (err: any) {
    await client.query("ROLLBACK");
    throw new Error(err.message || "External data source unavailable");
  } finally {
    client.release();
  }
};

export const getAllCountry = async (filters: any) => {
  let query = "SELECT * FROM countries WHERE 1=1";
  const params: any[] = [];
  let paramIndex = 1;

  if (filters.region) {
    query += ` AND LOWER(region) = LOWER($${paramIndex++})`;
    params.push(filters.region);
  }
  if (filters.currency) {
    query += ` AND LOWER(currency_code) = LOWER($${paramIndex++})`;
    params.push(filters.currency);
  }

  if (filters.sort === "gdp_desc") query += " ORDER BY estimated_gdp DESC";

  const result = await pool.query(query, params);
  return result.rows;
};

export const getCountryName = async (name: string) => {
  const result = await pool.query(
    "SELECT * FROM countries WHERE LOWER(name)=LOWER($1)",
    [name]
  );
  if (result.rows.length === 0) throw new Error("Country not found");
  return result.rows[0];
};

export const deleteOneCountry = async (name: string) => {
  const result = await pool.query(
    "DELETE FROM countries WHERE LOWER(name)=LOWER($1)",
    [name]
  );
  if (result.rowCount === 0) throw new Error("Country not found");
  return { message: `${name} deleted successfully` };
};

export const fetchStatus = async () => {
  const countResult = await pool.query(
    "SELECT COUNT(*) AS total_countries FROM countries"
  );
  const metaResult = await pool.query(
    "SELECT value FROM metadata WHERE key=$1",
    ["last_refreshed_at"]
  );

  return {
    total_countries: parseInt(countResult.rows[0].total_countries, 10),
    last_refreshed_at: metaResult.rows[0]?.value || null,
  };
};

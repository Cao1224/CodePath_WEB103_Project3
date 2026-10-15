import dotenv from "dotenv";
import pg from "pg";
import path from "node:path";
import { fileURLToPath } from "node:url";

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const requiredVars = [
  "PGHOST",
  "PGDATABASE",
  "PGUSER",
  "PGPASSWORD",
];

const missingVars = requiredVars.filter(
  (key) => !process.env[key]
);

if (missingVars.length > 0) {
  throw new Error(
    `Missing database environment variables: ${missingVars.join(", ")}`
  );
}

export const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT || 5432),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 10000,
});

pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL pool error:", error.message);
});
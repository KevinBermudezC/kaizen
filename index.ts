import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// Verificar que DATABASE_URL esté configurada
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL no está configurada en las variables de entorno');
}

// Crear el pool de conexiones
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Crear la instancia de Drizzle
const db = drizzle(pool);

export { db };
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/index";
import * as schema from "@/db/schema";

// Verificar que BETTER_AUTH_SECRET esté configurada
if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error('BETTER_AUTH_SECRET no está configurada en las variables de entorno');
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema, // Pasar todo el esquema para que Better Auth pueda encontrar las tablas
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Desactivar verificación por email por ahora
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 días
  },
  socialProviders: {},
  secret: process.env.BETTER_AUTH_SECRET,
});
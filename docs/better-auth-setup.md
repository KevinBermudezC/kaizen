# Configuración de Better Auth para Kaizen

## Resumen de la Implementación

Después de revisar la [documentación oficial de Better Auth](https://www.better-auth.com/docs/basic-usage), hemos implementado la autenticación correctamente usando la API oficial.

## Arquitectura Implementada

### 1. Servidor (`lib/auth.ts`)
```typescript
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "@/index"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 días
  },
  socialProviders: {},
})
```

### 2. Cliente (`lib/auth-client.ts`)
```typescript
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000"
})
```

### 3. Provider (`providers/auth-provider.tsx`)
```typescript
// Better Auth maneja el estado internamente usando nanostores
// NO necesitamos un provider personalizado
export function AuthProvider({ children }: AuthProviderProps) {
  return <>{children}</>
}

// Hook que usa Better Auth directamente
export function useAuth() {
  const session = authClient.useSession()
  
  return {
    user: session.data?.user || null,
    isLoading: session.isPending,
    error: session.error,
    signIn: authClient.signIn.email,
    signUp: authClient.signUp.email,
    signOut: authClient.signOut,
    forgotPassword: authClient.forgetPassword,
    getSession: authClient.getSession,
    refreshSession: session.refetch,
    session: session.data,
  }
}
```

## Cómo Funciona

### Estado de Autenticación
- **Better Auth maneja todo internamente** usando nanostores
- **`useSession()`** proporciona `{ data, isPending, error, refetch }`
- **No hay estado duplicado** en React

### Métodos de Autenticación
Según la documentación oficial, todos los métodos devuelven `{ data, error }`:

```typescript
// Sign Up
const { data, error } = await authClient.signUp.email({
  email,
  password,
  name,
  callbackURL: "/dashboard" // opcional
})

// Sign In
const { data, error } = await authClient.signIn.email({
  email,
  password,
  callbackURL: "/dashboard", // opcional
  rememberMe: false // opcional, por defecto true
})

// Forgot Password
const { data, error } = await authClient.forgetPassword({
  email
})
```

### Manejo de Errores
```typescript
if (error) {
  throw new Error(error.message || 'Error al autenticarse')
}

if (data) {
  // Operación exitosa
  console.log('Usuario autenticado:', data.user)
}
```

## Ventajas de Esta Implementación

✅ **Sin Provider personalizado** - Better Auth maneja todo  
✅ **API oficial** - Seguimos exactamente la documentación  
✅ **Estado sincronizado** - Cambios se reflejan en tiempo real  
✅ **Menos código** - No necesitamos Context, useState, useEffect  
✅ **Mejor rendimiento** - Usa nanostores optimizados  

## Próximos Pasos

1. **Configurar variables de entorno**:
   ```bash
   DATABASE_URL="postgresql://..."
   BETTER_AUTH_SECRET="tu-secreto-seguro"
   BETTER_AUTH_URL="http://localhost:3000"
   ```

2. **Configurar servidor de email** para verificación y recuperación

3. **Crear páginas de autenticación** usando el componente de ejemplo

4. **Integrar con el dashboard** para usuarios autenticados

## Referencias

- [Documentación oficial de Better Auth](https://www.better-auth.com/docs)
- [Basic Usage](https://www.better-auth.com/docs/basic-usage)
- [Session Management](https://www.better-auth.com/docs/concepts/session-management)

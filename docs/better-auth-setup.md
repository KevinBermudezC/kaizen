### 1. Servidor (`lib/auth.ts`)
```typescript
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { emailOTP } from "better-auth/plugins"
import { db } from "@/index"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  plugins: [
    emailOTP({
      // Configuración del plugin Email OTP
      otpLength: 6, // Código de 6 dígitos
      expiresIn: 300, // Expira en 5 minutos
      allowedAttempts: 3, // 3 intentos antes de invalidar
      overrideDefaultEmailVerification: true, // Usar OTP en lugar de enlaces
      sendVerificationOnSignUp: true, // Enviar OTP al registrarse
      
      // Función para enviar el OTP por email
      async sendVerificationOTP({ email, otp, type }) {
        // TODO: Implementar envío real de email
        console.log(`📧 Enviando OTP ${otp} a ${email} para ${type}`)
      },
    }),
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 días
  },
  socialProviders: {},
})
```

### 2. Cliente (`lib/auth-client.ts`)
```typescript
import { createAuthClient } from "better-auth/react"
import { emailOTPClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [
    emailOTPClient()
  ]
})
```

### 3. Hook (`hooks/use-auth.ts`)
```typescript
// Hook personalizado que usa Better Auth directamente
// Según la documentación oficial: https://www.better-auth.com/docs/basic-usage
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

## Plugin Email OTP

Hemos implementado el plugin de **Email OTP** que ofrece una experiencia de autenticación más segura y moderna:

### 🚀 Ventajas del Email OTP:

- ✅ **Más seguro** - No hay enlaces que puedan ser interceptados
- ✅ **Mejor UX** - Códigos de 6 dígitos fáciles de ingresar
- ✅ **Expiración automática** - Los códigos expiran en 5 minutos
- ✅ **Límite de intentos** - Máximo 3 intentos antes de invalidar
- ✅ **Verificación automática** - Se envía OTP al registrarse
- ✅ **Recuperación de contraseña** - Todo integrado en un solo plugin

### 📱 Funcionalidades disponibles:

1. **Inicio de sesión con OTP** - `emailOTP.signIn()`
2. **Verificación de email** - `emailOTP.verifyEmail()`
3. **Recuperación de contraseña** - `emailOTP.forgotPassword()`
4. **Restablecimiento de contraseña** - `emailOTP.resetPassword()`
5. **Envío de OTP** - `emailOTP.sendVerificationOTP()`

### 🔧 Configuración actual:

```typescript
emailOTP({
  otpLength: 6,                    // Código de 6 dígitos
  expiresIn: 300,                  // Expira en 5 minutos
  allowedAttempts: 3,              // 3 intentos máximo
  overrideDefaultEmailVerification: true,  // Usar OTP en lugar de enlaces
  sendVerificationOnSignUp: true,  // Enviar OTP al registrarse
})
```

### 📧 Implementación del envío de emails:

Actualmente el plugin está configurado para desarrollo (console.log). Para producción, necesitas:

1. **Elegir un email provider** (Resend, SendGrid, SMTP)
2. **Implementar la función `sendVerificationOTP`**
3. **Configurar las variables de entorno** correspondientes

Ver [Configuración de Email](./email-configuration.md) para más detalles.

## Próximos Pasos

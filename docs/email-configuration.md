# Configuración de Email para Better Auth

## ¿Por qué necesitamos un Email Provider?

Better Auth necesita enviar emails para:
- **Verificación de email** cuando un usuario se registra
- **Recuperación de contraseña** cuando un usuario olvida su contraseña

## Opciones de Email Provider

### 1. Resend (Recomendado para desarrollo)

[Resend](https://resend.com) ofrece 3,000 emails gratis por mes y es muy fácil de configurar.

#### Instalación
```bash
npm install resend
```

#### Configuración en `lib/auth.ts`
```typescript
import { betterAuth } from "better-auth"
import { resend } from "better-auth/email/resend"
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
  email: resend({
    apiKey: process.env.RESEND_API_KEY!,
    from: "noreply@tudominio.com", // o usar un dominio verificado
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 días
  },
  socialProviders: {},
})
```

#### Variables de entorno
```bash
RESEND_API_KEY="re_xxxxxxxxxxxx"
```

### 2. Gmail SMTP

#### Configuración en `lib/auth.ts`
```typescript
import { betterAuth } from "better-auth"
import { smtp } from "better-auth/email/smtp"
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
  email: smtp({
    host: process.env.SMTP_HOST!,
    port: parseInt(process.env.SMTP_PORT!),
    user: process.env.SMTP_USER!,
    password: process.env.SMTP_PASSWORD!,
    from: process.env.SMTP_USER!,
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 días
  },
  socialProviders: {},
})
```

#### Variables de entorno
```bash
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="tu-email@gmail.com"
SMTP_PASSWORD="tu-app-password"
```

**Nota:** Para Gmail, necesitas generar una "App Password" en la configuración de seguridad de tu cuenta.

### 3. SendGrid

#### Instalación
```bash
npm install @sendgrid/mail
```

#### Configuración en `lib/auth.ts`
```typescript
import { betterAuth } from "better-auth"
import { sendgrid } from "better-auth/email/sendgrid"
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
  email: sendgrid({
    apiKey: process.env.SENDGRID_API_KEY!,
    from: "noreply@tudominio.com",
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 días
  },
  socialProviders: {},
})
```

#### Variables de entorno
```bash
SENDGRID_API_KEY="SG.xxxxxxxxxxxx"
```

## Personalización de Templates

Puedes personalizar los emails que se envían:

```typescript
export const auth = betterAuth({
  // ... otras configuraciones
  email: resend({
    apiKey: process.env.RESEND_API_KEY!,
    from: "noreply@tudominio.com",
    templates: {
      emailVerification: {
        subject: "Verifica tu cuenta en Kaizen",
        html: `
          <h1>¡Bienvenido a Kaizen!</h1>
          <p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
          <a href="{{verificationUrl}}">Verificar cuenta</a>
        `,
      },
      forgotPassword: {
        subject: "Recupera tu contraseña en Kaizen",
        html: `
          <h1>Recuperación de contraseña</h1>
          <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
          <a href="{{resetUrl}}">Restablecer contraseña</a>
        `,
      },
    },
  }),
})
```

## Recomendación para Desarrollo

Para desarrollo, recomiendo usar **Resend** porque:
- ✅ 3,000 emails gratis por mes
- ✅ Configuración simple
- ✅ Templates predefinidos
- ✅ Dashboard para monitorear emails
- ✅ No requiere configuración de SMTP

## Próximos Pasos

1. **Elegir un email provider** (recomiendo Resend para empezar)
2. **Configurar las variables de entorno** correspondientes
3. **Actualizar `lib/auth.ts`** con la configuración del email
4. **Probar el registro** para verificar que se envían los emails
5. **Probar la recuperación de contraseña**

## Referencias

- [Better Auth Email Documentation](https://www.better-auth.com/docs/email)
- [Resend Documentation](https://resend.com/docs)
- [SendGrid Documentation](https://sendgrid.com/docs)

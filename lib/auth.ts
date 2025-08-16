import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP } from "better-auth/plugins";
import { db } from "@/index";

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
        // Aquí implementarías el envío del email
        // Por ahora usamos console.log para desarrollo
        console.log(`📧 Enviando OTP ${otp} a ${email} para ${type}`)
        
        // TODO: Implementar envío real de email usando Resend, SendGrid, etc.
        // Ejemplo con Resend:
        // await resend.emails.send({
        //   from: 'noreply@kaizen.com',
        //   to: email,
        //   subject: type === 'sign-in' ? 'Código de acceso' : 'Verifica tu cuenta',
        //   html: `<h1>Tu código de verificación: ${otp}</h1>`
        // })
      },
    }),
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 días
  },
  socialProviders: {},
});
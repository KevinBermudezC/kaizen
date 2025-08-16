'use client'

import { authClient } from "@/lib/auth-client"

// Hook personalizado que usa Better Auth directamente
// Según la documentación oficial: https://www.better-auth.com/docs/basic-usage
export function useAuth() {
  const session = authClient.useSession()
  
  return {
    // Estado de la sesión (según la documentación oficial)
    user: session.data?.user || null,
    isLoading: session.isPending,
    error: session.error,
    
    // Métodos de autenticación usando authClient
    // Estos métodos devuelven { data, error } según la documentación
    signIn: authClient.signIn.email,
    signUp: authClient.signUp.email,
    signOut: authClient.signOut,
    forgotPassword: authClient.forgetPassword,
    
    // Métodos adicionales útiles
    getSession: authClient.getSession,
    refreshSession: session.refetch,
    
    // Acceso directo a la sesión completa
    session: session.data,
    
    // Métodos del plugin Email OTP
    emailOTP: {
      // Enviar OTP para verificación
      sendVerificationOTP: authClient.emailOtp.sendVerificationOtp,
      
      // Iniciar sesión con OTP
      signIn: authClient.signIn.emailOtp,
      
      // Verificar email con OTP
      verifyEmail: authClient.emailOtp.verifyEmail,
      
      // Recuperar contraseña con OTP
      forgotPassword: authClient.forgetPassword.emailOtp,
      
      // Restablecer contraseña con OTP
      resetPassword: authClient.emailOtp.resetPassword,
    },
  }
}

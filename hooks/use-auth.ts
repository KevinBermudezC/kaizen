'use client'

import { authClient } from "@/lib/auth-client"

export function useAuth() {
  const session = authClient.useSession()
  
  return {
    // Estado de la sesión
    user: session.data?.user || null,
    isLoading: session.isPending,
    error: session.error,
    
    // Métodos de autenticación
    signIn: authClient.signIn.email,
    signUp: authClient.signUp.email,
    signOut: authClient.signOut,
    forgotPassword: authClient.forgetPassword,
    
    // Métodos adicionales útiles
    getSession: authClient.getSession,
    refreshSession: session.refetch,
    
    // Acceso directo a la sesión completa
    session: session.data,
  }
}

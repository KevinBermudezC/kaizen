'use client'

import { ReactNode } from "react"
import { authClient } from "@/lib/auth-client"

interface AuthProviderProps {
  children: ReactNode
}

// Better Auth maneja el estado de autenticación internamente usando nanostores
// No necesitamos un provider personalizado
export function AuthProvider({ children }: AuthProviderProps) {
  return <>{children}</>
}

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
  }
}
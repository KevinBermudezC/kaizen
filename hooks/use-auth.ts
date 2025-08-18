'use client'

import { useSession, signIn, signOut } from "next-auth/react"

export function useAuth() {
  const { data: session, status } = useSession()
  
  return {
    // Estado de la sesión
    user: session?.user || null,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    
    // Métodos de autenticación
    signIn: (credentials?: { email: string; password: string }) => 
      signIn("credentials", { 
        email: credentials?.email, 
        password: credentials?.password,
        redirect: false 
      }),
    signOut: () => signOut({ redirect: false }),
    
    // Acceso directo a la sesión completa
    session,
  }
}

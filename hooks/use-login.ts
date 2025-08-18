'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface LoginData {
  email: string
  password: string
}

interface UseLoginReturn {
  login: (data: LoginData) => Promise<{ success: boolean; error?: string }>
  isLoading: boolean
}

export function useLogin(): UseLoginReturn {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const login = async (data: LoginData) => {
    setIsLoading(true)
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        return {
          success: false,
          error: result.error === 'CredentialsSignin' 
            ? 'Email o contraseña incorrectos' 
            : result.error
        }
      }

      if (result?.ok) {
        // Redirigir al dashboard después del login exitoso
        router.push('/dashboard')
        return { success: true }
      }

      return {
        success: false,
        error: 'Error inesperado durante el login'
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error de conexión'
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { login, isLoading }
}

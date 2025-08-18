'use client'

import { useState } from 'react'

interface RegisterData {
  name: string
  email: string
  password: string
}

interface UseRegisterReturn {
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>
  isLoading: boolean
}

export function useRegister(): UseRegisterReturn {
  const [isLoading, setIsLoading] = useState(false)

  const register = async (data: RegisterData) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: result.error || 'Error en el registro'
        }
      }

      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error de conexión'
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { register, isLoading }
}

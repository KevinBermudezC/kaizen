'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode, useState } from 'react'

interface QueryProviderProps {
  children: ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  // ✅ Crear el QueryClient dentro del componente para evitar problemas de SSR
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ Configuración para hábitos - datos que cambian poco
        staleTime: 5 * 60 * 1000, // 5 minutos
        gcTime: 10 * 60 * 1000,   // 10 minutos (antes era cacheTime)
        retry: 1,                  // Solo reintentar 1 vez
        refetchOnWindowFocus: false, // No refetch al cambiar de pestaña
      },
      mutations: {
        // ✅ Configuración para mutaciones (crear/editar hábitos)
        retry: 0, // No reintentar mutaciones automáticamente
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* ✅ Solo mostrar DevTools en desarrollo */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}
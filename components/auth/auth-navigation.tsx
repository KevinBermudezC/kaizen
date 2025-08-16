'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { 
  LogIn, 
  UserPlus, 
  Lock, 
  Shield, 
  Home,
  ArrowRight 
} from 'lucide-react'

const authRoutes = [
  {
    path: '/login',
    label: 'Iniciar Sesión',
    icon: LogIn,
    description: 'Accede a tu cuenta'
  },
  {
    path: '/register',
    label: 'Registrarse',
    icon: UserPlus,
    description: 'Crea tu cuenta'
  },
  {
    path: '/forgot-password',
    label: 'Recuperar Contraseña',
    icon: Lock,
    description: 'Restablece tu acceso'
  },
  {
    path: '/verify-otp',
    label: 'Verificar OTP',
    icon: Shield,
    description: 'Código de verificación'
  }
]

export function AuthNavigation() {
  const pathname = usePathname()

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Navegación de Autenticación
        </h2>
        <p className="text-muted-foreground">
          Accede a todas las funcionalidades de autenticación de Kaizen
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {authRoutes.map((route) => {
          const Icon = route.icon
          const isActive = pathname === route.path
          
          return (
            <Link key={route.path} href={route.path}>
              <div className={cn(
                "p-6 rounded-lg border-2 transition-all duration-200 hover:shadow-lg",
                isActive 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50 hover:bg-primary/5"
              )}>
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "p-3 rounded-lg",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  )}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className={cn(
                      "font-semibold text-lg mb-1",
                      isActive ? "text-primary" : "text-foreground"
                    )}>
                      {route.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {route.description}
                    </p>
                  </div>
                  <ArrowRight className={cn(
                    "h-5 w-5 mt-1 transition-transform",
                    isActive ? "text-primary" : "text-muted-foreground",
                    "group-hover:translate-x-1"
                  )} />
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="text-center">
        <Link href="/">
          <Button variant="outline" size="lg">
            <Home className="mr-2 h-5 w-5" />
            Volver al Inicio
          </Button>
        </Link>
      </div>
    </div>
  )
}

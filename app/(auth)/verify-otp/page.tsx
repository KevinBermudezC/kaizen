'use client'

import { useState, useEffect } from 'react'
import { OtpForm } from '@/components/auth'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Mail, Clock, Shield } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function VerifyOtpPage() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [otpType, setOtpType] = useState<'sign-in' | 'email-verification' | 'forget-password'>('email-verification')

  useEffect(() => {
    const emailParam = searchParams.get('email')
    const typeParam = searchParams.get('type') as 'sign-in' | 'email-verification' | 'forget-password'
    
    if (emailParam) {
      setEmail(emailParam)
    }
    
    if (typeParam && ['sign-in', 'email-verification', 'forget-password'].includes(typeParam)) {
      setOtpType(typeParam)
    }
  }, [searchParams])

  const handleOtpSuccess = () => {
    console.log('OTP verificado exitosamente')
    
    switch (otpType) {
      case 'sign-in':
        break
      case 'email-verification':
        window.location.href = '/login'
        break
      case 'forget-password':
        break
    }
  }

  const handleBack = () => {
    switch (otpType) {
      case 'sign-in':
        window.location.href = '/login'
        break
      case 'email-verification':
        window.location.href = '/register'
        break
      case 'forget-password':
        window.location.href = '/forgot-password'
        break
      default:
        window.location.href = '/login'
    }
  }

  // Si no hay email, mostrar formulario para ingresarlo
  if (!email) {
    return (
      <div className="w-full">
        <Card className="bg-gradient-to-r from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800">
          <CardHeader className="text-center pb-3">
            <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-3">
              <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <CardTitle className="text-xl font-bold text-purple-700 dark:text-purple-300">
              Verificación OTP
            </CardTitle>
            <CardDescription className="text-purple-600 dark:text-purple-400 text-sm">
              Ingresa tu email para recibir el código de verificación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center text-xs text-purple-600 dark:text-purple-400">
              <p>Esta página requiere un email válido para funcionar.</p>
              <p>Por favor, accede desde el flujo de autenticación correspondiente.</p>
            </div>
            
            <div className="space-y-2">
              <Link href="/login">
                <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700 text-white cursor-pointer">
                  Ir al Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" variant="outline" className="w-full cursor-pointer">
                  Ir al Registro
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Botón volver arriba */}
      <div className="mb-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="cursor-pointer">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Inicio
          </Button>
        </Link>
      </div>

      <OtpForm 
        email={email}
        type={otpType}
        onSuccess={handleOtpSuccess}
        onBack={handleBack}
      />
      
      {/* Información adicional compacta */}
      <div className="mt-4 space-y-3">
        <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <Clock className="h-4 w-4" />
              Información del Código
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
              <p>• El código OTP tiene 6 dígitos numéricos</p>
              <p>• Expira automáticamente en 5 minutos</p>
              <p>• Máximo 3 intentos antes de solicitar uno nuevo</p>
              <p>• Revisa tu bandeja de entrada y carpeta de spam</p>
            </div>
          </CardContent>
        </Card>

        {/* Consejos de seguridad compactos */}
        <Card className="bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2 text-amber-700 dark:text-amber-300">
              <Shield className="h-4 w-4" />
              Seguridad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-amber-600 dark:text-amber-400 space-y-1">
              <p>• Nunca compartas tu código OTP con nadie</p>
              <p>• Kaizen nunca te pedirá el código por teléfono o chat</p>
              <p>• Si no solicitaste este código, ignóralo</p>
              <p>• El código es válido solo para tu cuenta</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

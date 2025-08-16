'use client'

import { ForgotPasswordForm } from '@/components/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield } from 'lucide-react'

export default function ForgotPasswordPage() {

  const handleForgotPasswordSuccess = () => {
    console.log('Email de recuperación enviado exitosamente')
  }

  return (
    <div className="w-full">
      <ForgotPasswordForm 
        onSuccess={handleForgotPasswordSuccess}
        onBackToSignIn={() => {
          window.location.href = '/login'
        }}
      />
      
      {/* Información adicional compacta */}
      <div className="mt-4 space-y-3">

        {/* Consejos de seguridad compactos */}
        <Card className="bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2 text-amber-700 dark:text-amber-300">
              <Shield className="h-4 w-4" />
              Consejos de Seguridad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-amber-600 dark:text-amber-400 space-y-1">
              <p>• Revisa tu bandeja de entrada y carpeta de spam</p>
              <p>• El código expira en 5 minutos por seguridad</p>
              <p>• No compartas el código con nadie</p>
              <p>• Usa contraseñas únicas y seguras</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
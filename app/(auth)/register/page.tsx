'use client'

import { SignUpForm } from '@/components/auth'
import { Card, CardContent } from '@/components/ui/card'
import { Target, Zap, Shield } from 'lucide-react'

export default function RegisterPage() {

  const handleSignUpSuccess = () => {
    console.log('Usuario registrado exitosamente')
  }

  return (
    <div className="w-full">

      <SignUpForm 
        onSuccess={handleSignUpSuccess}
        onSwitchToSignIn={() => {
          window.location.href = '/login'
        }}
      />
      
      {/* Información adicional compacta */}
      <div className="mt-4 space-y-3">
        {/* Beneficios compactos */}
        <Card className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <Target className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span className="text-blue-800 dark:text-blue-200 font-medium">Metas Claras</span>
              <span className="text-blue-600 dark:text-blue-400">• Define y alcanza tus objetivos</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
              <span className="text-purple-800 dark:text-purple-200 font-medium">Progreso Constante</span>
              <span className="text-purple-600 dark:text-purple-400">• Seguimiento visual de tu mejora</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Shield className="h-4 w-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
              <span className="text-indigo-800 dark:text-indigo-200 font-medium">Hábitos Sostenibles</span>
              <span className="text-indigo-600 dark:text-indigo-400">• Construye rutinas que perduren</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
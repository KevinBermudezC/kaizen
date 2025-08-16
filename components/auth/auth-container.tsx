'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { SignInForm } from './sign-in-form'
import { SignUpForm } from './sign-up-form'
import { ForgotPasswordForm } from './forgot-password-form'
import { OtpForm } from './otp-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, User, LogOut } from 'lucide-react'

type AuthView = 'signin' | 'signup' | 'forgot-password' | 'otp'
type OtpType = 'sign-in' | 'email-verification' | 'forget-password'

interface AuthContainerProps {
  onSuccess?: () => void
}

export function AuthContainer({ onSuccess }: AuthContainerProps) {
  const { user, isLoading, signOut } = useAuth()
  const [currentView, setCurrentView] = useState<AuthView>('signin')
  const [otpEmail, setOtpEmail] = useState('')
  const [otpType, setOtpType] = useState<OtpType>('sign-in')

  const handleSwitchView = (view: AuthView) => {
    setCurrentView(view)
  }

  const handleOtpRequest = (email: string, type: OtpType) => {
    setOtpEmail(email)
    setOtpType(type)
    setCurrentView('otp')
  }

  const handleAuthSuccess = () => {
    onSuccess?.()
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      setCurrentView('signin')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center space-y-4">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Verificando autenticación...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (user) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <User className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">
            ¡Bienvenido, {user.name || user.email}!
          </CardTitle>
          <CardDescription>
            Has iniciado sesión exitosamente en Kaizen
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground space-y-2">
            <div className="flex justify-between">
              <span>ID:</span>
              <span className="font-mono">{user.id}</span>
            </div>
            <div className="flex justify-between">
              <span>Email:</span>
              <span>{user.email}</span>
            </div>
            {user.name && (
              <div className="flex justify-between">
                <span>Nombre:</span>
                <span>{user.name}</span>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Button
              onClick={handleAuthSuccess}
              className="w-full"
            >
              Ir al Dashboard
            </Button>
            
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'signin':
        return (
          <SignInForm
            onSuccess={handleAuthSuccess}
            onSwitchToSignUp={() => handleSwitchView('signup')}
            onSwitchToForgotPassword={() => handleSwitchView('forgot-password')}
          />
        )
        
      case 'signup':
        return (
          <SignUpForm
            onSuccess={handleAuthSuccess}
            onSwitchToSignIn={() => handleSwitchView('signin')}
          />
        )
        
      case 'forgot-password':
        return (
          <ForgotPasswordForm
            onSuccess={handleAuthSuccess}
            onBackToSignIn={() => handleSwitchView('signin')}
          />
        )
        
      case 'otp':
        return (
          <OtpForm
            email={otpEmail}
            type={otpType}
            onSuccess={handleAuthSuccess}
            onBack={() => {
              if (otpType === 'forget-password') {
                setCurrentView('forgot-password')
              } else {
                setCurrentView('signin')
              }
            }}
            onResend={() => {
              // El OTP se reenvía automáticamente
            }}
          />
        )
        
      default:
        return (
          <SignInForm
            onSuccess={handleAuthSuccess}
            onSwitchToSignUp={() => handleSwitchView('signup')}
            onSwitchToForgotPassword={() => handleSwitchView('forgot-password')}
          />
        )
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {renderCurrentView()}
      
      {/* Indicador de vista actual */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
          <span>Vista:</span>
          <span className="font-medium capitalize">{currentView.replace('-', ' ')}</span>
        </div>
      </div>
    </div>
  )
}

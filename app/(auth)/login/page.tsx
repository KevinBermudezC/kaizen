'use client'

import { SignInForm } from '@/components/auth'


export default function LoginPage() {

  const handleSignInSuccess = () => {
    console.log('Usuario autenticado exitosamente')
  }

  return (
    <div className="w-full">
      <SignInForm 
        onSuccess={handleSignInSuccess}
        onSwitchToSignUp={() => {
          window.location.href = '/register'
        }}
        onSwitchToForgotPassword={() => {
          window.location.href = '/forgot-password'
        }}
      />
    </div>
  )
}
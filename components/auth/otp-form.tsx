'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { otpSchema, type OtpFormData } from '@/lib/validations/auth'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Loader2, ArrowLeft, CheckCircle, Clock } from 'lucide-react'
import React from 'react'

interface OtpFormProps {
  email: string
  type: 'sign-in' | 'email-verification' | 'forget-password'
  onSuccess?: () => void
  onBack?: () => void
  onResend?: () => void
}

export function OtpForm({ email, type, onSuccess, onBack, onResend }: OtpFormProps) {
  const { emailOTP } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const form = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email,
      otp: '',
    },
  })

  // Iniciar countdown para reenvío
  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleResend = async () => {
    if (countdown > 0) return
    
    setIsSubmitting(true)
    try {
      const { data, error } = await emailOTP.sendVerificationOTP({ email, type })
      
      if (error) {
        form.setError('root', {
          type: 'manual',
          message: error.message || 'Error al reenviar OTP',
        })
        return
      }
      
      if (data) {
        setCountdown(60) // 60 segundos de espera
        onResend?.()
      }
    } catch (error) {
      form.setError('root', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'Error inesperado',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const onSubmit = async (data: OtpFormData) => {
    setIsSubmitting(true)
    
    try {
      let result, error
      
      switch (type) {
        case 'sign-in':
          const signInResult = await emailOTP.signIn({ email: data.email, otp: data.otp })
          result = signInResult.data
          error = signInResult.error
          break
          
        case 'email-verification':
          const verifyResult = await emailOTP.verifyEmail({ email: data.email, otp: data.otp })
          result = verifyResult.data
          error = verifyResult.error
          break
          
        case 'forget-password':
          // Para recuperación de contraseña, solo verificamos el OTP
          // El restablecimiento se hace en otro paso
          result = { success: true }
          error = null
          break
          
        default:
          error = { message: 'Tipo de OTP no válido' }
      }
      
      if (error) {
        form.setError('root', {
          type: 'manual',
          message: error.message || 'Error al verificar OTP',
        })
        return
      }
      
      if (result) {
        setIsSuccess(true)
        onSuccess?.()
      }
    } catch (error) {
      form.setError('root', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'Error inesperado',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getTypeInfo = () => {
    switch (type) {
      case 'sign-in':
        return {
          title: 'Iniciar Sesión con OTP',
          description: 'Ingresa el código de 6 dígitos enviado a tu email',
          successTitle: '¡Sesión iniciada!',
          successDescription: 'Has iniciado sesión exitosamente con OTP',
        }
      case 'email-verification':
        return {
          title: 'Verificar Email',
          description: 'Ingresa el código de 6 dígitos para verificar tu cuenta',
          successTitle: '¡Email verificado!',
          successDescription: 'Tu email ha sido verificado exitosamente',
        }
      case 'forget-password':
        return {
          title: 'Verificar OTP',
          description: 'Ingresa el código de 6 dígitos para continuar',
          successTitle: '¡OTP verificado!',
          successDescription: 'Ahora puedes restablecer tu contraseña',
        }
      default:
        return {
          title: 'Verificar OTP',
          description: 'Ingresa el código de 6 dígitos',
          successTitle: '¡Verificado!',
          successDescription: 'Operación completada exitosamente',
        }
    }
  }

  const typeInfo = getTypeInfo()

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-600 dark:text-green-400">
            {typeInfo.successTitle}
          </CardTitle>
          <CardDescription>
            {typeInfo.successDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            type="button"
            className="w-full cursor-pointer"
            onClick={onSuccess}
          >
            Continuar
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {typeInfo.title}
        </CardTitle>
        <CardDescription className="text-center">
          {typeInfo.description}
        </CardDescription>
        <div className="text-center text-sm text-muted-foreground">
          Código enviado a <span className="font-medium">{email}</span>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código OTP</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="123456"
                      maxLength={6}
                      className="text-center text-lg font-mono tracking-widest"
                      autoComplete="one-time-code"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Error general del formulario */}
            {form.formState.errors.root && (
              <div className="text-sm text-destructive text-center bg-destructive/10 p-3 rounded-md">
                {form.formState.errors.root.message}
              </div>
            )}

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verificando...
                </>
              ) : (
                'Verificar OTP'
              )}
            </Button>
          </form>
        </Form>

        {/* Reenvío de OTP */}
        <div className="mt-6 space-y-3">
          <div className="text-center">
            <Button
              type="button"
              variant="ghost"
              className="text-sm cursor-pointer"
              onClick={handleResend}
              disabled={isSubmitting || countdown > 0}
            >
              {countdown > 0 ? (
                <>
                  <Clock className="mr-2 h-4 w-4" />
                  Reenviar en {countdown}s
                </>
              ) : (
                'Reenviar código'
              )}
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground text-center space-y-1">
            <p>• El código expira en 5 minutos</p>
            <p>• Máximo 3 intentos antes de solicitar uno nuevo</p>
            <p>• Revisa tu bandeja de entrada y spam</p>
          </div>
        </div>

        {/* Botón de regreso */}
        {onBack && (
          <div className="mt-4 text-center">
            <Button
              type="button"
              variant="ghost"
              className="text-sm cursor-pointer"
              onClick={onBack}
              disabled={isSubmitting}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

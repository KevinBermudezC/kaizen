'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/lib/validations/auth'
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
import { Loader2, ArrowLeft, CheckCircle } from 'lucide-react'

interface ForgotPasswordFormProps {
  onSuccess?: () => void
  onBackToSignIn?: () => void
}

export function ForgotPasswordForm({ onSuccess, onBackToSignIn }: ForgotPasswordFormProps) {
  const { forgotPassword } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsSubmitting(true)
    
    try {
      const { data: result, error } = await forgotPassword({
        email: data.email,
      })
      
      if (error) {
        form.setError('root', {
          type: 'manual',
          message: error.message || 'Error al enviar email de recuperación',
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

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-600 dark:text-green-400">
            ¡Email enviado!
          </CardTitle>
          <CardDescription>
            Hemos enviado un enlace de recuperación a tu email
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground text-center space-y-2">
            <p>
              Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
            </p>
            <p>
              Si no recibes el email, revisa tu carpeta de spam o contacta con soporte.
            </p>
          </div>
          
          <Button
            type="button"
            variant="outline"
            className="w-full cursor-pointer"
            onClick={onBackToSignIn}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio de sesión
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Recuperar Contraseña
        </CardTitle>
        <CardDescription className="text-center">
          Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="tu@email.com"
                      autoComplete="email"
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
                  Enviando email...
                </>
              ) : (
                'Enviar Email de Recuperación'
              )}
            </Button>
          </form>
        </Form>

        {/* Enlaces de navegación */}
        <div className="mt-6 text-center">
          <Button
            type="button"
            variant="ghost"
            className="w-full text-sm cursor-pointer"
            onClick={onBackToSignIn}
            disabled={isSubmitting}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio de sesión
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

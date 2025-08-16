'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema, type SignInFormData } from '@/lib/validations/auth'
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
import { Eye, EyeOff, Loader2 } from 'lucide-react'

interface SignInFormProps {
  onSuccess?: () => void
  onSwitchToSignUp?: () => void
  onSwitchToForgotPassword?: () => void
}

export function SignInForm({ onSuccess, onSwitchToSignUp, onSwitchToForgotPassword }: SignInFormProps) {
  const { signIn } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: SignInFormData) => {
    setIsSubmitting(true)
    
    try {
      const { data: result, error } = await signIn({
        email: data.email,
        password: data.password,
      })
      
      if (error) {
        form.setError('root', {
          type: 'manual',
          message: error.message || 'Error al iniciar sesión',
        })
        return
      }
      
      if (result) {
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

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Iniciar Sesión
        </CardTitle>
        <CardDescription className="text-center">
          Accede a tu cuenta en Kaizen
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
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        disabled={isSubmitting}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isSubmitting}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        </span>
                      </Button>
                    </div>
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
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </Button>
          </form>
        </Form>

        {/* Enlaces de navegación */}
        <div className="mt-6 space-y-3 text-center">
          <Button
            type="button"
            variant="ghost"
            className="w-full text-sm cursor-pointer"
            onClick={onSwitchToForgotPassword}
            disabled={isSubmitting}
          >
            ¿Olvidaste tu contraseña?
          </Button>
          
          <div className="text-sm text-muted-foreground">
            ¿No tienes cuenta?{' '}
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto font-normal text-primary hover:text-primary/80 cursor-pointer"
              onClick={onSwitchToSignUp}
              disabled={isSubmitting}
            >
              Regístrate aquí
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

import { AuthContainer } from '@/components/auth'

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/30 dark:from-slate-900 dark:via-blue-900/20 dark:to-green-900/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Kaizen
          </h1>
          <p className="text-muted-foreground">
            Sistema de autenticación completo con formularios validados
          </p>
        </div>
        
        <AuthContainer 
          onSuccess={() => {
            console.log('Usuario autenticado exitosamente')
            // Aquí puedes redirigir al dashboard o hacer cualquier otra acción
          }}
        />
      </div>
    </div>
  )
}

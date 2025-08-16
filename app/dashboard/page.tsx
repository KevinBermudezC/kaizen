'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Target, TrendingUp, Calendar, BarChart3 } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/30 dark:from-slate-900 dark:via-blue-900/20 dark:to-green-900/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">改</span>
              </div>
              <span className="font-bold text-xl text-foreground">Kaizen Dashboard</span>
            </div>
            <Link href="/">
              <Button variant="ghost" size="sm" className="cursor-pointer">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Inicio
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Título de bienvenida */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              ¡Bienvenido a tu Dashboard!
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Aquí podrás gestionar tus hábitos, ver tu progreso y mantener tu mejora continua
            </p>
          </div>

          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Hábitos Activos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">0</div>
                <p className="text-sm text-muted-foreground">Hábitos en seguimiento</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Racha Actual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">0</div>
                <p className="text-sm text-muted-foreground">Días consecutivos</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  Completados Hoy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">0</div>
                <p className="text-sm text-muted-foreground">De 0 hábitos</p>
              </CardContent>
            </Card>
          </div>

          {/* Acciones rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Crear Nuevo Hábito
                </CardTitle>
                <CardDescription>
                  Define un nuevo hábito que quieras desarrollar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full cursor-pointer">
                  Crear Hábito
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  Ver Progreso
                </CardTitle>
                <CardDescription>
                  Analiza tu rendimiento y estadísticas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full cursor-pointer">
                  Ver Estadísticas
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Mensaje de bienvenida */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-blue-50/50 to-green-50/50 dark:from-blue-950/20 dark:to-green-950/20 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">
                      ¡Comienza tu viaje Kaizen!
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 text-sm">
                      Crea tu primer hábito y comienza a construir la mejor versión de ti mismo.
                      Recuerda: la mejora continua se logra paso a paso, día a día.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
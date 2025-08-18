"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Target, TrendingUp, Calendar, CheckCircle2, Circle, Flame, Award, Plus } from "lucide-react"

// Mock data - en una app real vendría de una API/base de datos
const mockStats = {
  todayCompleted: 4,
  todayTotal: 6,
  currentStreak: 12,
  totalHabits: 8,
  weeklyProgress: 78,
}

const mockTodayHabits = [
  { id: 1, name: "Meditar 10 minutos", completed: true, time: "07:00" },
  { id: 2, name: "Leer 30 páginas", completed: true, time: "08:30" },
  { id: 3, name: "Ejercicio 45 min", completed: true, time: "18:00" },
  { id: 4, name: "Escribir en diario", completed: true, time: "21:00" },
  { id: 5, name: "Beber 8 vasos de agua", completed: false, time: "Todo el día" },
  { id: 6, name: "Dormir antes de 23:00", completed: false, time: "23:00" },
]

const motivationalQuote = {
  text: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
  author: "Robert Collier",
}

export default function DashboardOverview() {
  const completionPercentage = Math.round((mockStats.todayCompleted / mockStats.todayTotal) * 100)

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Welcome Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-3xl font-heading font-bold">¡Buen día!</h1>
        <p className="text-muted-foreground mt-1">Continúa tu camino de mejora continua con Kaizen</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hoy</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockStats.todayCompleted}/{mockStats.todayTotal}
            </div>
            <p className="text-xs text-muted-foreground">{completionPercentage}% completado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Racha Actual</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.currentStreak}</div>
            <p className="text-xs text-muted-foreground">días consecutivos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Esta Semana</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.weeklyProgress}%</div>
            <p className="text-xs text-muted-foreground">progreso semanal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hábitos</CardTitle>
            <Award className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalHabits}</div>
            <p className="text-xs text-muted-foreground">hábitos activos</p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's Habits */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Hábitos de Hoy</CardTitle>
                  <CardDescription>
                    {mockStats.todayCompleted} de {mockStats.todayTotal} completados
                  </CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockTodayHabits.map((habit, index) => (
                  <motion.div
                    key={habit.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                         className="flex items-center space-x-3 p-3 rounded-lg border bg-card hover:bg-muted/30 hover:border-border/60 transition-all duration-200 ease-in-out"
                  >
                    <Button variant="ghost" size="sm" className="p-0 h-6 w-6">
                      {habit.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </Button>
                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium ${habit.completed ? "line-through text-muted-foreground" : ""}`}
                      >
                        {habit.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{habit.time}</p>
                    </div>
                    {habit.completed && (
                      <Badge variant="secondary" className="text-xs">
                        Completado
                      </Badge>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress & Motivation */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="space-y-6"
        >
          {/* Daily Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Progreso Diario</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{completionPercentage}%</div>
                <Progress value={completionPercentage} className="h-2" />
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completados</span>
                  <span className="font-medium">{mockStats.todayCompleted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pendientes</span>
                  <span className="font-medium">{mockStats.todayTotal - mockStats.todayCompleted}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Motivational Quote */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Inspiración</CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="text-sm italic text-muted-foreground leading-relaxed">
                &quot;{motivationalQuote.text}&quot;
              </blockquote>
              <cite className="text-xs text-muted-foreground mt-3 block">— {motivationalQuote.author}</cite>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Ver Calendario
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                Ver Progreso
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                <Target className="h-4 w-4 mr-2" />
                Gestionar Hábitos
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

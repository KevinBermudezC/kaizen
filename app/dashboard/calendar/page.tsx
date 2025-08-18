"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import { useState } from "react"

export default function CalendarPage() {
  // Estado para el mes actual
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Datos de ejemplo para los hábitos del mes
  const habits = [
    { id: 1, name: "Ejercicio diario", color: "bg-blue-500" },
    { id: 2, name: "Leer", color: "bg-green-500" },
    { id: 3, name: "Meditar", color: "bg-purple-500" },
    { id: 4, name: "Beber agua", color: "bg-cyan-500" }
  ]

  // Datos de ejemplo para el progreso diario
  const dailyProgress = {
    "2024-01-01": [1, 2, 3, 4], // Todos los hábitos completados
    "2024-01-02": [1, 2, 4],    // Hábitos 1, 2 y 4 completados
    "2024-01-03": [1, 3],       // Solo hábitos 1 y 3
    "2024-01-04": [2, 4],       // Solo hábitos 2 y 4
    "2024-01-05": [1, 2, 3, 4], // Todos completados
    "2024-01-06": [1, 2],       // Solo hábitos 1 y 2
    "2024-01-07": [1, 2, 3, 4], // Todos completados
  }

  // Función para obtener el nombre del mes
  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
  }

  // Función para obtener los días del mes
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    const days = []
    
    // Agregar días del mes anterior para completar la primera semana
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Agregar todos los días del mes
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }

  // Función para navegar al mes anterior
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  // Función para navegar al mes siguiente
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  // Función para formatear la fecha como clave
  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  // Función para obtener el progreso de un día específico
  const getDayProgress = (date: Date) => {
    const dateKey = formatDateKey(date)
    return dailyProgress[dateKey as keyof typeof dailyProgress] || []
  }

  // Función para obtener el porcentaje de completado de un día
  const getDayCompletionPercentage = (date: Date) => {
    const completed = getDayProgress(date).length
    return Math.round((completed / habits.length) * 100)
  }

  const days = getDaysInMonth(currentMonth)

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Calendario</h1>
        <p className="text-muted-foreground">
          Visualiza tu progreso diario en el calendario
        </p>
      </div>

      {/* Controles del calendario */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl capitalize">{getMonthName(currentMonth)}</CardTitle>
              <CardDescription>
                Progreso de tus hábitos durante el mes
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
                <IconChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={goToNextMonth}>
                <IconChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Leyenda de hábitos */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Leyenda de Hábitos:</h3>
            <div className="flex flex-wrap gap-3">
              {habits.map((habit) => (
                <div key={habit.id} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${habit.color}`} />
                  <span className="text-sm text-muted-foreground">{habit.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Calendario */}
          <div className="grid grid-cols-7 gap-1">
            {/* Días de la semana */}
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
            
            {/* Días del mes */}
            {days.map((day, index) => (
              <div
                key={index}
                className={`min-h-[80px] p-2 border rounded-lg ${
                  day ? 'bg-background hover:bg-muted/50' : 'bg-muted/20'
                }`}
              >
                {day && (
                  <>
                    <div className="text-sm font-medium mb-2">
                      {day.getDate()}
                    </div>
                    
                    {/* Indicadores de hábitos completados */}
                    <div className="space-y-1">
                      {habits.map((habit) => {
                        const isCompleted = getDayProgress(day).includes(habit.id)
                        return (
                          <div
                            key={habit.id}
                            className={`w-2 h-2 rounded-full mx-auto ${
                              isCompleted ? habit.color : 'bg-muted'
                            }`}
                            title={`${habit.name}: ${isCompleted ? 'Completado' : 'Pendiente'}`}
                          />
                        )
                      })}
                    </div>
                    
                    {/* Porcentaje de completado */}
                    <div className="mt-2 text-center">
                      <Badge variant="outline" className="text-xs">
                        {getDayCompletionPercentage(day)}%
                      </Badge>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resumen del mes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Días Perfectos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Días con 100% de hábitos completados
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Promedio Diario</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <p className="text-xs text-muted-foreground">
              Promedio de hábitos completados por día
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Mejor Día</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Lun, 1</div>
            <p className="text-xs text-muted-foreground">
              Día con mejor rendimiento
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Vista de semana actual */}
      <Card>
        <CardHeader>
          <CardTitle>Esta Semana</CardTitle>
          <CardDescription>
            Progreso detallado de la semana actual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 7 }, (_, i) => {
              const date = new Date()
              date.setDate(date.getDate() - date.getDay() + i)
              const progress = getDayProgress(date)
              const percentage = getDayCompletionPercentage(date)
              
              return (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 text-center text-sm font-medium">
                      {date.toLocaleDateString('es-ES', { weekday: 'short' })}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {habits.map((habit) => {
                        const isCompleted = progress.includes(habit.id)
                        return (
                          <div
                            key={habit.id}
                            className={`w-3 h-3 rounded-full ${
                              isCompleted ? habit.color : 'bg-muted'
                            }`}
                          />
                        )
                      })}
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {percentage}%
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

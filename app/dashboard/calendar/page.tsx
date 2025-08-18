"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar, CheckCircle2, Circle, Target } from "lucide-react"

// Mock data para el calendario
const currentDate = new Date()
const currentMonth = currentDate.getMonth()
const currentYear = currentDate.getFullYear()

const mockHabits = [
  { id: 1, name: "Meditar", color: "blue" },
  { id: 2, name: "Leer", color: "green" },
  { id: 3, name: "Ejercicio", color: "orange" },
  { id: 4, name: "Diario", color: "purple" },
]

// Generar datos mock para el mes
const generateMonthData = (month: number, year: number) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const data: Record<string, { completed: number[]; total: number }> = {}

  for (let day = 1; day <= daysInMonth; day++) {
    const completedHabits = mockHabits
      .filter(() => Math.random() > 0.3) // 70% probabilidad de completar
      .map((habit) => habit.id)

    data[day.toString()] = {
      completed: completedHabits,
      total: mockHabits.length,
    }
  }

  return data
}

const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
]

const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

export default function CalendarView() {
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const [selectedDate, setSelectedDate] = useState<number | null>(null)

  const monthData = generateMonthData(selectedMonth, selectedYear)

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const navigateMonth = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (selectedMonth === 0) {
        setSelectedMonth(11)
        setSelectedYear(selectedYear - 1)
      } else {
        setSelectedMonth(selectedMonth - 1)
      }
    } else {
      if (selectedMonth === 11) {
        setSelectedMonth(0)
        setSelectedYear(selectedYear + 1)
      } else {
        setSelectedMonth(selectedMonth + 1)
      }
    }
    setSelectedDate(null)
  }

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear)
  const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  const getCompletionPercentage = (day: number) => {
    const dayData = monthData[day.toString()]
    if (!dayData) return 0
    return Math.round((dayData.completed.length / dayData.total) * 100)
  }

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500"
    if (percentage >= 60) return "bg-yellow-500"
    if (percentage >= 40) return "bg-orange-500"
    if (percentage > 0) return "bg-red-500"
    return "bg-muted"
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-3xl font-heading font-bold">Calendario</h1>
        <p className="text-muted-foreground mt-1">Visualiza tu progreso día a día</p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {monthNames[selectedMonth]} {selectedYear}
                  </CardTitle>
                  <CardDescription>Haz clic en un día para ver los detalles</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {emptyDays.map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square" />
                ))}

                {days.map((day) => {
                  const percentage = getCompletionPercentage(day)
                  const isToday =
                    day === currentDate.getDate() &&
                    selectedMonth === currentDate.getMonth() &&
                    selectedYear === currentDate.getFullYear()
                  const isSelected = selectedDate === day

                  return (
                    <motion.button
                      key={day}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedDate(day)}
                      className={`aspect-square p-2 rounded-lg border transition-colors relative ${
                        isSelected
                          ? "border-primary bg-primary/10"
                          : isToday
                            ? "border-primary bg-primary/5"
                            : "border-border hover:bg-accent"
                      }`}
                    >
                      <div className="text-sm font-medium">{day}</div>
                      <div
                        className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 rounded-full ${getCompletionColor(percentage)}`}
                      />
                    </motion.button>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-4 mt-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-1 bg-muted rounded-full" />
                  <span>Sin datos</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-1 bg-red-500 rounded-full" />
                  <span>0-40%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-1 bg-orange-500 rounded-full" />
                  <span>40-60%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-1 bg-yellow-500 rounded-full" />
                  <span>60-80%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-1 bg-green-500 rounded-full" />
                  <span>80-100%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Day Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate ? `${selectedDate} de ${monthNames[selectedMonth]}` : "Selecciona un día"}
              </CardTitle>
              <CardDescription>
                {selectedDate ? "Detalles de hábitos del día" : "Haz clic en un día del calendario"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDate ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">{getCompletionPercentage(selectedDate)}%</div>
                    <p className="text-sm text-muted-foreground">Completado</p>
                  </div>

                  <div className="space-y-3">
                    {mockHabits.map((habit) => {
                      const dayData = monthData[selectedDate.toString()]
                      const isCompleted = dayData?.completed.includes(habit.id) || false

                      return (
                        <div key={habit.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full bg-${habit.color}-500`} />
                            <span className="text-sm font-medium">{habit.name}</span>
                          </div>
                          {isCompleted ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      )
                    })}
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Completados</span>
                      <span className="font-medium">{monthData[selectedDate.toString()]?.completed.length || 0}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total</span>
                      <span className="font-medium">{mockHabits.length}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Selecciona un día en el calendario para ver los detalles de tus hábitos
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

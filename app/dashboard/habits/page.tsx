"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Target, Calendar, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"

// Mock data - en una app real vendría de una API/base de datos
const mockHabits = [
  {
    id: 1,
    name: "Meditar 10 minutos",
    description: "Práctica diaria de mindfulness para reducir estrés",
    category: "Bienestar",
    frequency: "Diario",
    streak: 12,
    completedToday: true,
    color: "blue",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Leer 30 páginas",
    description: "Lectura de libros de desarrollo personal y técnicos",
    category: "Educación",
    frequency: "Diario",
    streak: 8,
    completedToday: true,
    color: "green",
    createdAt: "2024-01-20",
  },
  {
    id: 3,
    name: "Ejercicio 45 min",
    description: "Rutina de ejercicio cardiovascular y fuerza",
    category: "Salud",
    frequency: "Lunes, Miércoles, Viernes",
    streak: 15,
    completedToday: false,
    color: "orange",
    createdAt: "2024-01-10",
  },
  {
    id: 4,
    name: "Escribir en diario",
    description: "Reflexión diaria y planificación del día siguiente",
    category: "Productividad",
    frequency: "Diario",
    streak: 5,
    completedToday: true,
    color: "purple",
    createdAt: "2024-02-01",
  },
  {
    id: 5,
    name: "Beber 8 vasos de agua",
    description: "Mantener hidratación adecuada durante el día",
    category: "Salud",
    frequency: "Diario",
    streak: 3,
    completedToday: false,
    color: "cyan",
    createdAt: "2024-02-05",
  },
]

const categories = ["Todos", "Salud", "Bienestar", "Educación", "Productividad"]

export default function HabitsOverview() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const filteredHabits = mockHabits.filter((habit) => {
    const matchesSearch = habit.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Todos" || habit.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const stats = {
    total: mockHabits.length,
    completedToday: mockHabits.filter((h) => h.completedToday).length,
    activeStreak: Math.max(...mockHabits.map((h) => h.streak)),
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">Mis Hábitos</h1>
            <p className="text-muted-foreground mt-1">Gestiona y da seguimiento a tus hábitos diarios</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/habits/new">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Hábito
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="grid gap-4 md:grid-cols-3"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hábitos</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">hábitos activos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completados Hoy</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedToday}</div>
            <p className="text-xs text-muted-foreground">de {stats.total} hábitos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mejor Racha</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeStreak}</div>
            <p className="text-xs text-muted-foreground">días consecutivos</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar hábitos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-5 sm:w-auto">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="text-xs">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Habits Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredHabits.map((habit, index) => (
          <motion.div
            key={habit.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            whileHover={{ y: -2 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-3 h-3 rounded-full bg-${habit.color}-500`} />
                      <Badge variant="secondary" className="text-xs">
                        {habit.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{habit.name}</CardTitle>
                    <CardDescription className="text-sm mt-1">{habit.description}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {habit.frequency}
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-orange-500" />
                      <span className="font-medium">{habit.streak} días</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant={habit.completedToday ? "default" : "outline"} className="text-xs">
                      {habit.completedToday ? "Completado hoy" : "Pendiente"}
                    </Badge>
                    <Button
                      size="sm"
                      variant={habit.completedToday ? "secondary" : "default"}
                      className="h-7 px-3 text-xs"
                    >
                      {habit.completedToday ? "Desmarcar" : "Completar"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredHabits.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No se encontraron hábitos</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || selectedCategory !== "Todos"
              ? "Intenta ajustar tus filtros de búsqueda"
              : "Comienza creando tu primer hábito"}
          </p>
          <Button asChild>
            <Link href="/dashboard/habits/new">
              <Plus className="h-4 w-4 mr-2" />
              Crear Hábito
            </Link>
          </Button>
        </motion.div>
      )}
    </div>
  )
}

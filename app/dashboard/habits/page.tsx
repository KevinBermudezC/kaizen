import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { IconTarget, IconPlus, IconEdit, IconTrash } from "@tabler/icons-react"

export default function HabitsPage() {
  // Datos de ejemplo para los hábitos
  const habits = [
    {
      id: 1,
      name: "Ejercicio diario",
      description: "30 minutos de ejercicio cardiovascular",
      frequency: "Diario",
      streak: 7,
      status: "active",
      category: "Salud"
    },
    {
      id: 2,
      name: "Leer",
      description: "Leer 20 páginas por día",
      frequency: "Diario",
      streak: 15,
      status: "active",
      category: "Desarrollo personal"
    },
    {
      id: 3,
      name: "Meditar",
      description: "10 minutos de meditación matutina",
      frequency: "Diario",
      streak: 3,
      status: "active",
      category: "Bienestar"
    },
    {
      id: 4,
      name: "Beber agua",
      description: "8 vasos de agua al día",
      frequency: "Diario",
      streak: 21,
      status: "active",
      category: "Salud"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mis Hábitos</h1>
          <p className="text-muted-foreground">
            Gestiona y rastrea tus hábitos diarios para mejorar tu vida
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <IconPlus className="mr-2 h-4 w-4" />
          Nuevo Hábito
        </Button>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Hábitos</CardTitle>
            <IconTarget className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{habits.length}</div>
            <p className="text-xs text-muted-foreground">
              Hábitos activos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Racha Actual</CardTitle>
            <IconTarget className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">21</div>
            <p className="text-xs text-muted-foreground">
              Días consecutivos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completados Hoy</CardTitle>
            <IconTarget className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3/4</div>
            <p className="text-xs text-muted-foreground">
              75% completado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mejor Racha</CardTitle>
            <IconTarget className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              Días consecutivos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de hábitos */}
      <Card>
        <CardHeader>
          <CardTitle>Hábitos Activos</CardTitle>
          <CardDescription>
            Gestiona tus hábitos diarios y rastrea tu progreso
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <IconTarget className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{habit.name}</h3>
                    <p className="text-sm text-muted-foreground">{habit.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {habit.frequency}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {habit.category}
                      </Badge>
                      <Badge className={`text-xs ${getStatusColor(habit.status)}`}>
                        {habit.streak} días
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <IconEdit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <IconTrash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IconTarget, IconTrendingUp, IconCalendar, IconAward } from "@tabler/icons-react"

export default function ProgressPage() {
  // Datos de ejemplo para el progreso
  const weeklyProgress = [
    { day: "Lun", completed: 4, total: 4, percentage: 100 },
    { day: "Mar", completed: 3, total: 4, percentage: 75 },
    { day: "Mié", completed: 4, total: 4, percentage: 100 },
    { day: "Jue", completed: 2, total: 4, percentage: 50 },
    { day: "Vie", completed: 4, total: 4, percentage: 100 },
    { day: "Sáb", completed: 3, total: 4, percentage: 75 },
    { day: "Dom", completed: 4, total: 4, percentage: 100 }
  ]

  const habitStats = [
    {
      name: "Ejercicio diario",
      currentStreak: 7,
      bestStreak: 45,
      completionRate: 85,
      trend: "up"
    },
    {
      name: "Leer",
      currentStreak: 15,
      bestStreak: 30,
      completionRate: 92,
      trend: "up"
    },
    {
      name: "Meditar",
      currentStreak: 3,
      bestStreak: 21,
      completionRate: 65,
      trend: "down"
    },
    {
      name: "Beber agua",
      currentStreak: 21,
      bestStreak: 60,
      completionRate: 98,
      trend: "up"
    }
  ]

  const achievements = [
    { name: "Primera Semana", description: "Completaste 7 días consecutivos", icon: "🎯", unlocked: true },
    { name: "Constancia", description: "30 días consecutivos", icon: "🔥", unlocked: true },
    { name: "Maestro", description: "100 días consecutivos", icon: "👑", unlocked: false },
    { name: "Perfecto", description: "Una semana al 100%", icon: "⭐", unlocked: true }
  ]

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Progreso</h1>
        <p className="text-muted-foreground">
          Visualiza tu progreso y celebra tus logros
        </p>
      </div>

      {/* Estadísticas generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio Semanal</CardTitle>
            <IconTrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86%</div>
            <p className="text-xs text-muted-foreground">
              +2% vs semana anterior
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
            <CardTitle className="text-sm font-medium">Hábitos Activos</CardTitle>
            <IconTarget className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              En progreso
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Logros</CardTitle>
            <IconAward className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3/4</div>
            <p className="text-xs text-muted-foreground">
              Desbloqueados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progreso semanal */}
      <Card>
        <CardHeader>
          <CardTitle>Progreso Semanal</CardTitle>
          <CardDescription>
            Tu rendimiento durante los últimos 7 días
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  {day.day}
                </div>
                <div className="relative h-24 bg-muted rounded-lg overflow-hidden">
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-primary transition-all duration-300"
                    style={{ height: `${day.percentage}%` }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-xs font-medium">
                    <span className="text-foreground">{day.completed}/{day.total}</span>
                    <span className="text-muted-foreground">{day.percentage}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas por hábito */}
      <Card>
        <CardHeader>
          <CardTitle>Estadísticas por Hábito</CardTitle>
          <CardDescription>
            Rendimiento detallado de cada hábito
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {habitStats.map((habit, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <IconTarget className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{habit.name}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-muted-foreground">
                        Racha actual: <span className="font-medium">{habit.currentStreak}</span>
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Mejor: <span className="font-medium">{habit.bestStreak}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{habit.completionRate}%</div>
                  <div className="flex items-center space-x-1">
                    <IconTrendingUp className={`h-4 w-4 ${
                      habit.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`} />
                    <span className={`text-xs ${
                      habit.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {habit.trend === 'up' ? 'Mejorando' : 'Bajando'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Logros */}
      <Card>
        <CardHeader>
          <CardTitle>Logros</CardTitle>
          <CardDescription>
            Celebra tus hitos y logros alcanzados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg ${
                  achievement.unlocked 
                    ? 'bg-primary/5 border-primary/20' 
                    : 'bg-muted/50 border-muted'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {achievement.name}
                    </h3>
                    <p className={`text-sm ${
                      achievement.unlocked ? 'text-muted-foreground' : 'text-muted-foreground/60'
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.unlocked && (
                    <Badge className="bg-primary text-primary-foreground">
                      Desbloqueado
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

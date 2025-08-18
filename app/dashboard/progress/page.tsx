"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, Target, Award, Flame } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts"

// Mock data para gráficos
const weeklyData = [
  { day: "Lun", completed: 5, total: 6 },
  { day: "Mar", completed: 6, total: 6 },
  { day: "Mié", completed: 4, total: 6 },
  { day: "Jue", completed: 6, total: 6 },
  { day: "Vie", completed: 5, total: 6 },
  { day: "Sáb", completed: 3, total: 6 },
  { day: "Dom", completed: 4, total: 6 },
]

const monthlyData = [
  { month: "Ene", percentage: 78 },
  { month: "Feb", percentage: 82 },
  { month: "Mar", percentage: 75 },
  { month: "Abr", percentage: 88 },
  { month: "May", percentage: 92 },
  { month: "Jun", percentage: 85 },
]

const categoryData = [
  { name: "Salud", value: 35, color: "#10b981" },
  { name: "Bienestar", value: 25, color: "#3b82f6" },
  { name: "Educación", value: 20, color: "#8b5cf6" },
  { name: "Productividad", value: 20, color: "#f59e0b" },
]

const streakData = [
  { habit: "Meditar", streak: 12, color: "blue" },
  { habit: "Leer", streak: 8, color: "green" },
  { habit: "Ejercicio", streak: 15, color: "orange" },
  { habit: "Diario", streak: 5, color: "purple" },
]

export default function ProgressOverview() {
  const totalCompletion = Math.round(
    (weeklyData.reduce((acc, day) => acc + day.completed, 0) / weeklyData.reduce((acc, day) => acc + day.total, 0)) *
      100,
  )

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-3xl font-heading font-bold">Progreso</h1>
        <p className="text-muted-foreground mt-1">Analiza tu evolución y mantén la motivación</p>
      </motion.div>

      {/* Overview Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Esta Semana</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCompletion}%</div>
            <p className="text-xs text-muted-foreground">+5% vs semana anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Racha Más Larga</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">días consecutivos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hábitos Activos</CardTitle>
            <Target className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">en seguimiento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Logros</CardTitle>
            <Award className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">metas alcanzadas</p>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs defaultValue="weekly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="weekly">Semanal</TabsTrigger>
          <TabsTrigger value="monthly">Mensual</TabsTrigger>
          <TabsTrigger value="categories">Categorías</TabsTrigger>
          <TabsTrigger value="streaks">Rachas</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Progreso Semanal</CardTitle>
                <CardDescription>Hábitos completados por día esta semana</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    completed: {
                      label: "Completados",
                      color: "hsl(var(--primary))",
                    },
                    total: {
                      label: "Total",
                      color: "hsl(var(--muted))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
                      <XAxis dataKey="day" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="completed" fill="var(--color-completed)" radius={4} />
                      <Bar dataKey="total" fill="var(--color-total)" radius={4} opacity={0.3} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Tendencia Mensual</CardTitle>
                <CardDescription>Porcentaje de completación por mes</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    percentage: {
                      label: "Porcentaje",
                      color: "hsl(var(--primary))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="percentage"
                        stroke="var(--color-percentage)"
                        strokeWidth={3}
                        dot={{ fill: "var(--color-percentage)", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="grid gap-4 md:grid-cols-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Distribución por Categoría</CardTitle>
                <CardDescription>Tiempo dedicado a cada área</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Porcentaje",
                    },
                  }}
                  className="h-[250px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Desglose por Categoría</CardTitle>
                <CardDescription>Porcentaje de tiempo por área</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {categoryData.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                        <span>{category.name}</span>
                      </div>
                      <span className="font-medium">{category.value}%</span>
                    </div>
                    <Progress value={category.value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="streaks" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Rachas Actuales</CardTitle>
                <CardDescription>Días consecutivos por hábito</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {streakData.map((item, index) => (
                  <motion.div
                    key={item.habit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full bg-${item.color}-500`} />
                      <span className="font-medium">{item.habit}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame className="h-4 w-4 text-orange-500" />
                      <span className="text-lg font-bold">{item.streak}</span>
                      <span className="text-sm text-muted-foreground">días</span>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

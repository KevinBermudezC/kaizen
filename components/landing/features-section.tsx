"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, BarChart3, Bell, Smartphone } from "lucide-react"
import { motion } from "framer-motion"

export function FeaturesSection() {
  const features = [
    {
      icon: Calendar,
      title: "Calendario Intuitivo",
      description:
        "Visualiza tu progreso diario con un calendario limpio y fácil de usar. Cada día completado se marca automáticamente.",
      color: "primary"
    },
    {
      icon: BarChart3,
      title: "Estadísticas Detalladas",
      description:
        "Analiza tu rendimiento con gráficos claros. Ve tu racha actual, porcentaje de éxito y tendencias mensuales.",
      color: "secondary"
    },
    {
      icon: Bell,
      title: "Recordatorios Inteligentes",
      description: "Recibe notificaciones personalizadas en el momento perfecto para mantener tus hábitos en marcha.",
      color: "accent"
    },
    {
      icon: Smartphone,
      title: "Código Abierto",
      description:
        "Proyecto de portfolio completamente gratuito y de código abierto. Contribuye y personaliza según tus necesidades.",
      color: "primary"
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return "bg-primary/10 text-primary group-hover:bg-primary/20"
      case "secondary":
        return "bg-secondary/10 text-secondary group-hover:bg-secondary/20"
      case "accent":
        return "bg-accent/10 text-accent group-hover:bg-accent/20"
      default:
        return "bg-primary/10 text-primary group-hover:bg-primary/20"
    }
  }

  return (
    <section id="funciones" className="py-20 px-4 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Todo lo que necesitas para el éxito</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Funciones minimalistas diseñadas para hacer que formar hábitos sea simple y efectivo. Completamente gratis.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 h-full group bg-background">
                <CardHeader>
                  <motion.div
                    className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${getColorClasses(feature.color)}`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <feature.icon className="h-6 w-6" />
                  </motion.div>
                  <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

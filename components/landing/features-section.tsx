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
      color: "primary",
      gradient: "from-blue-500/20 to-blue-600/20 dark:from-blue-400/20 dark:to-blue-500/20"
    },
    {
      icon: BarChart3,
      title: "Estadísticas Detalladas",
      description:
        "Analiza tu rendimiento con gráficos claros. Ve tu racha actual, porcentaje de éxito y tendencias mensuales.",
      color: "secondary",
      gradient: "from-green-500/20 to-green-600/20 dark:from-green-400/20 dark:to-green-500/20"
    },
    {
      icon: Bell,
      title: "Recordatorios Inteligentes",
      description: "Recibe notificaciones personalizadas en el momento perfecto para mantener tus hábitos en marcha.",
      color: "accent",
      gradient: "from-orange-500/20 to-orange-600/20 dark:from-orange-400/20 dark:to-orange-500/20"
    },
    {
      icon: Smartphone,
      title: "Código Abierto",
      description:
        "Proyecto de portfolio completamente gratuito y de código abierto. Contribuye y personaliza según tus necesidades.",
      color: "primary",
      gradient: "from-purple-500/20 to-purple-600/20 dark:from-purple-400/20 dark:to-purple-500/20"
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
        return "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25"
      case "secondary":
        return "bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25"
      case "accent":
        return "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25"
      default:
        return "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25"
    }
  }

  return (
    <section id="funciones" className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/30 dark:from-slate-900 dark:via-blue-900/20 dark:to-green-900/20">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Todo lo que necesitas para el éxito
          </h2>
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
              <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 h-full cursor-pointer bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800">
                {/* Gradiente de fondo sutil */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Borde superior con color */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                
                <CardHeader className="relative z-10">
                  <motion.div
                    className={`h-14 w-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${getColorClasses(feature.color)}`}
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <feature.icon className="h-7 w-7" />
                  </motion.div>
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-base leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                
                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Target, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <section className="py-20 px-4">
      <motion.div
        className="container mx-auto max-w-4xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight" variants={itemVariants}>
          Mejora continua
          <span className="block text-accent">con Kaizen</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          El gestor de hábitos minimalista y gratuito. Basado en la filosofía japonesa Kaizen para el crecimiento
          personal continuo.
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row gap-4 justify-center mb-12" variants={itemVariants}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" className="text-lg px-8 py-6">
              Comenzar Gratis
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              Ver en GitHub
            </Button>
          </motion.div>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16" variants={containerVariants}>
          <motion.div className="flex flex-col items-center text-center" variants={itemVariants} whileHover={{ y: -5 }}>
            <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold mb-2">Seguimiento Simple</h3>
            <p className="text-sm text-muted-foreground">Marca tus hábitos completados con un solo toque</p>
          </motion.div>

          <motion.div className="flex flex-col items-center text-center" variants={itemVariants} whileHover={{ y: -5 }}>
            <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold mb-2">Metas Claras</h3>
            <p className="text-sm text-muted-foreground">Define objetivos específicos y alcanzables</p>
          </motion.div>

          <motion.div className="flex flex-col items-center text-center" variants={itemVariants} whileHover={{ y: -5 }}>
            <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold mb-2">Progreso Visual</h3>
            <p className="text-sm text-muted-foreground">Visualiza tu crecimiento con gráficos intuitivos</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

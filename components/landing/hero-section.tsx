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
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/30 dark:from-slate-900 dark:via-blue-900/20 dark:to-green-900/20">
      <motion.div
        className="container mx-auto max-w-4xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight" variants={itemVariants}>
          <span className="text-foreground">Mejora continua</span>
          <span className="block text-primary dark:text-blue-400">con Kaizen</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          El gestor de hábitos minimalista y gratuito. Basado en la filosofía japonesa Kaizen para el crecimiento
          personal continuo.
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row gap-4 justify-center mb-12" variants={itemVariants}>
          <motion.div 
            whileHover={{ scale: 1.05, y: -3 }} 
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:shadow-xl">
              Comenzar Gratis
            </Button>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, y: -3 }} 
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:shadow-xl dark:hover:bg-primary/80 dark:hover:text-primary-foreground dark:border-primary">
              Ver en GitHub
            </Button>
          </motion.div>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16" variants={containerVariants}>
          <motion.div 
            className="flex flex-col items-center text-center group cursor-pointer" 
            variants={itemVariants} 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg shadow-blue-500/25">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2 text-foreground">Seguimiento Simple</h3>
            <p className="text-sm text-muted-foreground">Marca tus hábitos completados con un solo toque</p>
          </motion.div>

          <motion.div 
            className="flex flex-col items-center text-center group cursor-pointer" 
            variants={itemVariants} 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg shadow-green-500/25">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2 text-foreground">Metas Claras</h3>
            <p className="text-sm text-muted-foreground">Define objetivos específicos y alcanzables</p>
          </motion.div>

          <motion.div 
            className="flex flex-col items-center text-center group cursor-pointer" 
            variants={itemVariants} 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4 transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg shadow-orange-500/25">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2 text-foreground">Progreso Visual</h3>
            <p className="text-sm text-muted-foreground">Visualiza tu crecimiento con gráficos intuitivos</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

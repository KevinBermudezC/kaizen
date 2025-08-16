"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 h-16 items-center">
          {/* Logo - Izquierda */}
          <motion.div
            className="flex items-center space-x-2 justify-start"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">改</span>
            </div>
            <span className="font-bold text-xl text-foreground">Kaizen</span>
          </motion.div>

          {/* Navegación - Centro */}
          <nav className="hidden md:flex items-center justify-center space-x-8">
            <motion.a
              href="#inicio"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ y: -2 }}
            >
              Inicio
            </motion.a>
            <motion.a
              href="#funciones"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ y: -2 }}
            >
              Funciones
            </motion.a>
            <motion.a
              href="#testimonios"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ y: -2 }}
            >
              Testimonios
            </motion.a>
            <motion.a
              href="#contacto"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ y: -2 }}
            >
              Contacto
            </motion.a>
          </nav>

          {/* Botón - Derecha */}
          <motion.div 
            className="flex justify-end"
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Acceso Gratuito
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}

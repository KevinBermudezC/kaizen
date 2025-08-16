"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <motion.div
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-lg">改</span>
          </div>
          <span className="font-bold text-xl">Kaizen</span>
        </motion.div>

        <nav className="hidden md:flex items-center space-x-8">
          <motion.a
            href="#inicio"
            className="text-sm font-medium hover:text-accent transition-colors"
            whileHover={{ y: -2 }}
          >
            Inicio
          </motion.a>
          <motion.a
            href="#funciones"
            className="text-sm font-medium hover:text-accent transition-colors"
            whileHover={{ y: -2 }}
          >
            Funciones
          </motion.a>
          <motion.a
            href="#testimonios"
            className="text-sm font-medium hover:text-accent transition-colors"
            whileHover={{ y: -2 }}
          >
            Testimonios
          </motion.a>
          <motion.a
            href="#contacto"
            className="text-sm font-medium hover:text-accent transition-colors"
            whileHover={{ y: -2 }}
          >
            Contacto
          </motion.a>
        </nav>

        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="outline" size="sm">
            Acceso Gratuito
          </Button>
        </motion.div>
      </div>
    </motion.header>
  )
}

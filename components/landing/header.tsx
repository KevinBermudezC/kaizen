"use client"

import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Link from "next/link"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Evitar errores de hidratación
  if (!mounted) {
    return (
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 h-16 items-center">
            {/* Logo - Izquierda */}
            <motion.div
              className="flex items-center space-x-2 justify-start cursor-pointer"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
            >
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center transition-all duration-200 hover:shadow-lg">
                <span className="text-primary-foreground font-bold text-lg">改</span>
              </div>
              <span className="font-bold text-xl text-foreground">Kaizen</span>
            </motion.div>

            {/* Navegación - Centro */}
            <nav className="hidden md:flex items-center justify-center space-x-8 col-span-2">
              <motion.a
                href="#inicio"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 relative group"
                whileHover={{ y: -2 }}
              >
                Inicio
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
              </motion.a>
              <motion.a
                href="#funciones"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 relative group"
                whileHover={{ y: -2 }}
              >
                Funciones
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
              </motion.a>
              <motion.a
                href="#testimonios"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 relative group"
                whileHover={{ y: -2 }}
              >
                Testimonios
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
              </motion.a>
              <motion.a
                href="#contacto"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 relative group"
                whileHover={{ y: -2 }}
              >
                Contacto
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
              </motion.a>
            </nav>

            {/* Botones - Derecha */}
            <div className="flex items-center justify-end space-x-3">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }} 
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 15 }}
              >
                <Toggle
                  pressed={false}
                  onPressedChange={toggleTheme}
                  variant="outline"
                  size="sm"
                  className="border-border hover:bg-muted bg-background transition-all duration-200 hover:shadow-md"
                >
                  <Moon className="h-4 w-4 text-blue-600" />
                </Toggle>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }} 
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 15 }}
              >
                <Link href="/login">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:shadow-lg cursor-pointer">
                    Acceso Gratuito
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>
    )
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-4 h-16 items-center">
          {/* Logo - Izquierda */}
          <motion.div
            className="flex items-center space-x-2 justify-start cursor-pointer"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
          >
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center transition-all duration-200 hover:shadow-lg">
              <span className="text-primary-foreground font-bold text-lg">改</span>
            </div>
            <span className="font-bold text-xl text-foreground">Kaizen</span>
          </motion.div>

          {/* Navegación - Centro */}
          <nav className="hidden md:flex items-center justify-center space-x-8 col-span-2">
            <motion.a
              href="#inicio"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 relative group"
              whileHover={{ y: -2 }}
            >
              Inicio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </motion.a>
            <motion.a
              href="#funciones"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 relative group"
              whileHover={{ y: -2 }}
            >
              Funciones
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </motion.a>
            <motion.a
              href="#testimonios"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 relative group"
              whileHover={{ y: -2 }}
            >
              Testimonios
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </motion.a>
            <motion.a
              href="#contacto"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 relative group"
              whileHover={{ y: -2 }}
            >
              Contacto
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </motion.a>
          </nav>

          {/* Botones - Derecha */}
          <div className="flex items-center justify-end space-x-3">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }} 
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 15 }}
            >
              <Toggle
                pressed={theme === "dark"}
                onPressedChange={toggleTheme}
                variant="outline"
                size="sm"
                className="border-border hover:bg-muted bg-background transition-all duration-200 hover:shadow-md"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4 text-yellow-500" />
                ) : (
                  <Moon className="h-4 w-4 text-blue-600" />
                )}
              </Toggle>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }} 
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 15 }}
            >
              <Link href="/login">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:shadow-lg cursor-pointer">
                  Acceso Gratuito
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

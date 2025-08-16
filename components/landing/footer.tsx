"use client"

import { motion } from "framer-motion"
import { Github, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-muted via-muted/80 to-muted/60 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <motion.div
              className="flex items-center space-x-2 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">改</span>
              </div>
              <span className="font-bold text-xl text-foreground">Kaizen</span>
            </motion.div>
            <p className="text-sm text-muted-foreground mb-4">
              Mejora continua a través de hábitos simples. Completamente gratuito y de código abierto.
            </p>
            <motion.a
              href="#"
              className="inline-flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ x: 5 }}
            >
              <Github className="h-4 w-4" />
              <span>Ver en GitHub</span>
            </motion.a>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Producto</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <motion.a href="#funciones" className="hover:text-primary transition-colors" whileHover={{ x: 5 }}>
                  Funciones
                </motion.a>
              </li>
              <li>
                <motion.a href="#testimonios" className="hover:text-primary transition-colors" whileHover={{ x: 5 }}>
                  Testimonios
                </motion.a>
              </li>
              <li>
                <motion.a href="#" className="hover:text-primary transition-colors" whileHover={{ x: 5 }}>
                  Roadmap
                </motion.a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Comunidad</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <motion.a href="#" className="hover:text-primary transition-colors" whileHover={{ x: 5 }}>
                  Contribuir
                </motion.a>
              </li>
              <li>
                <motion.a href="#" className="hover:text-primary transition-colors" whileHover={{ x: 5 }}>
                  Reportar Bug
                </motion.a>
              </li>
              <li>
                <motion.a href="#" className="hover:text-primary transition-colors" whileHover={{ x: 5 }}>
                  Discusiones
                </motion.a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Recursos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <motion.a href="#" className="hover:text-primary transition-colors" whileHover={{ x: 5 }}>
                  Documentación
                </motion.a>
              </li>
              <li>
                <motion.a href="#" className="hover:text-primary transition-colors" whileHover={{ x: 5 }}>
                  Filosofía Kaizen
                </motion.a>
              </li>
              <li>
                <motion.a href="#" className="hover:text-primary transition-colors" whileHover={{ x: 5 }}>
                  Blog
                </motion.a>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <p>&copy; {new Date().getFullYear()} Kaizen. Proyecto de código abierto.</p>
            <div className="flex items-center space-x-1">
              <span>Hecho con</span>
              <Heart className="h-3 w-3 fill-accent text-accent" />
              <span>para la comunidad</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
